import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: null
        }
    }

    setUser = ({user, isUser}) => {
        if (isUser) {
            this.setError('Name is taken by someone else!')
        } else {
            this.setError(null)
            this.props.setUser(user)
        }
    }

    setError = (error) => {
        this.setState({
            error: error
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const socket = this.props.socket;
        const name = this.state.name.trim();
        if (name === "") {
            this.setError("You must have a name!")
        } else {
            socket.emit(VERIFY_USER, name, this.setUser);
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
 
    render() {
        const error = this.state.error;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name" 
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Your Username"
                        autoComplete="off"
                    />
                    {/* If error */}
                    <div className="error">{error !== null ? error : null }</div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}