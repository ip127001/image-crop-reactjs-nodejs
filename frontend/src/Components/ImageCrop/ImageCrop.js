import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './ImageCrop.css';
import { generateBase64FromImage } from '../../utils/Image';
import axios from 'axios';

class ImageCrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postForm: {
                image: {
                    value: ''
                },
                select: {
                    value: 'center'
                }
            },
            maxDim: {
                exactWidth: 1024,
                exactHeight: 1024
            },
            dimensions: {
                width: 1024,
                height: 1024
            },
            imagePreview: null,
            errors: null,
            redirect: false
        }
        this.myRef = React.createRef();
        this.selectRef = React.createRef();
    }
    componentDidUpdate() {
        console.log(this.state.dimensions);
        if(this.state.dimensions.width !== this.state.maxDim.exactWidth && this.state.dimensions.height !== this.state.maxDim.exactHeight ) {
            alert('please select image of size 1024*1024');
            this.setState({postForm: {image: { value: ''}}, imagePreview: null, dimensions: {width: 1024, height: 1024}})
            this.myRef.current.value = '';
            console.log(this.myRef.current.value);
            
        }
    }

    selectOnChangehandler = (event) => {
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.postForm,
                select: {
                    ...prevState.postForm['select'],
                    value: this.selectRef.current.value
                }
            };
            return {
                postForm: updatedForm
            };
        });
    }

    fileOnChangeHandler = (input, event, files ) => {
        console.log(input, event.target.value, files);
        console.log(files[0].type, files[0].size);

        if (files) {
            generateBase64FromImage(files[0])
                .then(b64 => {
                this.setState({ imagePreview: b64 });
                })
                .catch(e => {
                this.setState({ imagePreview: null });
                });
        }
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.postForm,
                [input]: {
                    ...prevState.postForm[input],
                    value: files ? files[0] : event.target.value
                }
            };
            return {
                postForm: updatedForm
            };
        });
    }

    fileOnSubmitHandler = (event) => {
        event.preventDefault();
        const post = {
            image: this.state.postForm.image.value,
            select: this.state.postForm.select.value
        };
        console.log('file', this.state.postForm.image.value);
        const formData = new FormData();
        formData.append('image', post.image);
        formData.append('select', post.select);
        console.log(formData);
        let url = 'http://localhost:8080/image/upload';
        axios({
            method: 'post',
            url: url,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            console.log(res);
            this.setState({redirect: true, postForm: {image: { value: ''}}, imagePreview: null, dimensions: {width: 1024, height: 1024}})

        })
        .catch(err => {
            console.log(err);
        });
    }

    onLoadHandler = ({target: img}, input='image') => {
        console.log(this.state.dimensions.width, img.naturalWidth)
        this.setState({dimensions: {width: img.naturalWidth, height: img.naturalHeight}});
    }

    render() {
        let redirect;
        if(this.state.redirect) {
            redirect = <Redirect to="/pics" />
        }
        return (
            <div className='ImageCrop'>
            {redirect}
            <div>
                {this.state.errors}
            </div>
            <p>dimensions width={this.state.dimensions.width}</p>
                <form onSubmit={this.fileOnSubmitHandler}>
                    <input type="file" ref={this.myRef} onChange={e => this.fileOnChangeHandler('image', e, e.target.files)} />
                    <select ref={this.selectRef} onChange={e => this.selectOnChangehandler(e)} style={{margin: "10px", padding: "5px", borderRadius: "3px"}}>
                        <option value="center">center</option>
                        <option value="top">Top</option>
                        <option value="left">left</option>
                        <option value="bottom">Bottom</option>
                        <option value="left top">left top</option>
                        <option value="left bottom">left bottom</option>
                        <option value="right top">right top</option>
                        <option value="right bottom">right bottom</option>
                    </select>
                    <button style={{margin: "10px", padding: "5px"}}>Upload image</button>
                </form><br></br>
                <div className="new-post__preview-image">
                    {!this.state.imagePreview && <p>Please choose an image.</p>}
                    {this.state.imagePreview && (
                        <img onLoad={this.onLoadHandler} src={this.state.imagePreview} alt="preview" />
                    )}
                </div>
            </div>
        )
    }
}

export default ImageCrop;