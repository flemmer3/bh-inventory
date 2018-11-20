import React, {Component} from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';

export default class Login extends Component
{
    constructor() 
    {
        super();
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Login request');
        axios.post("/login", {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log('login response: ');
            console.log(response);
            if (response.status === 200) {
                // success
            }
        }).catch(error => {
            console.log('login error: ');
            console.log(error);
        });
    }

    render() 
    {
        return <div>
            <form onSubmit={this.handleSubmit}>
                Email:<br/>
                <input name="email" type="email"/><br/>
                Password:<br/>
                <input name="password" type="password"/><br/>
                <input type="submit"/>
            </form>
        </div>;
    }
}