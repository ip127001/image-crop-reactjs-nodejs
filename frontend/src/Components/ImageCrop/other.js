import React, { Component } from 'react'

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

class ImgDropAndCrop extends Component {
    constructor(props){
        super(props)
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
        this.state = {
            imgSrc: null,
            crop: {
                x: 10,
                y: 10,
                width: 80,
                height: 80
            }
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleFileSelect = event => {
        // console.log(event)
        const files = event.target.files
        if (files && files.length > 0){
            const isVerified = this.verifyFile(files);
            if (isVerified){
                // imageBase64Data 
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", ()=>{
                    // console.log(myFileItemReader.result)
                    const myResult = myFileItemReader.result
                    this.setState({
                        imgSrc: myResult
                    })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }
    render () {
    return (
        <div>
            <h1>Drop and Crop</h1>
            <input ref={this.fileInputRef} type='file' accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect} />
        </div>
        )
    }
}

export default ImgDropAndCrop