import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Post from './Post'
import Popup from './Popup'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            picture: "",
            images: []
        }
    }
    componentDidMount = () => {
        this.setState({ name: localStorage.getItem('name') })
        this.setState({ email: localStorage.getItem('email') })
        this.setState({ picture: localStorage.getItem('picture') })
        axios.get("https://dog.ceo/api/breeds/image/random/7")
            .then(res => {
                console.log(res.data.message)
                this.setState({ images: res.data.message })
            })
    }
    logout = () => {
        localStorage.clear()
    }
    render() {
        return (
            <div>
                <nav   className = "navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/' className = "link" >Home</Link>
                    <Link to='/Contact' className = "link" >Contact</Link>
                    <Link to='/logout' className = "link" onClick={this.logout}>Logout</Link>
                </nav>
           
                <div className="pageHeader">
                    <img className="avatar" src={this.state.picture}></img>
                    <h4>{this.state.name}</h4>
                    <h5>{this.state.email}</h5>
                </div>
                {this.state.images.map((item, index) => {
                    return <Post key={index} title="This is my dog" src={item}></Post>
                })}
                <Popup />
        </div>
        )
    }
}