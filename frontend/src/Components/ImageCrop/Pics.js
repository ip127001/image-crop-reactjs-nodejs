import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import './Pics.css';

class SinglePost extends Component {
    state = {
        image: [],
        clicked: false
    }

    componentDidMount() {
        const arrImage = [{link: 'http://localhost:8080/images/horizontal.jpeg', id: 1},
        {link: 'http://localhost:8080/images/gallary.jpeg', id: 2}, 
        {link: 'http://localhost:8080/images/small.jpeg', id: 3}, {link: 'http://localhost:8080/images/vertical.jpeg', id: 4}]
        this.setState({image: arrImage})
    }

    onChangeHandler = () => {
        this.setState({clicked: true})
    }   
    render() {
        let redirect = null;
        if (this.state.clicked) {
            redirect = <Redirect to="/" />
        }
        let images;
        images = this.state.image.map(el => {
            return (<div className="Pic" key={el.id}>
                    <img src={el.link} alt="pic"/>
                </div>)
        })
        return (
        <section className="single-post">
            {redirect}
            <button onClick={this.onChangeHandler} style={{marginTop: "30px"}}>Go to Home</button>
            <h1>here are the 4 croped images</h1>
            <div className="Area">
                {images}
            </div>
        </section>
        );
    }
}

export default SinglePost;
