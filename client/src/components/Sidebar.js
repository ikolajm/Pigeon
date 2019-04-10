import React, { Component } from 'react';
import { FaSistrix, FaDoorOpen } from 'react-icons/fa';
import { createChatFromUsers } from '../Factories';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSendPrivateMessage(this.state.name)
        this.setState({
            name: ''
        })
    }

    render() {
        return (
            <div id="side-bar">
                {/* Heading */}
                <div className="heading">
                    <div className="app-name">{this.props.title}</div>
                </div>
                {/* Search */}
                <form onSubmit={this.handleSubmit} className="search">
                    <i className="search-icon"><FaSistrix /></i>
                    <input onChange={e => { this.setState({ name: e.target.value })}} placeholder="Search" type="text" value={this.state.name} />
                    <div className="plus"></div>
                </form>
                {/* Chats */}
                <div className="users">
                    
                    {/* Show individual chats (previews) */}
                    { this.props.chats.map( chat => {
                        if(chat.name) {
                            const lastMessage = chat.messages[chat.messages.length - 1];
                            const chatName = chat.isGlobal ? chat.name : createChatFromUsers(chat.users, this.props.user.name)
                            const classNames = (this.props.activeChat && this.props.activeChat.id === chat.id) ? 'active' : ''
                            
                            return (
                                <div 
                                    key={chat.id} 
                                    className={`user ${classNames}`}
                                    onClick={ ()=>{ this.props.setActiveChat(chat) } }
                                    >
                                    <div className="user-photo">{chatName[0].toUpperCase()}</div>
                                    <div className="user-info">
                                        <div className="name">{chatName}</div>
                                        {lastMessage && <div className="last-message">
                                            {lastMessage.sender === this.props.user.name ? "You" : lastMessage.sender}: {lastMessage.message.substring(0, 27)}...
                                        </div>}
                                    </div>
                                </div>
                            )
                        } else {
                            return
                        }
                    }) }
                    
                </div>
                {/* Logout */}
                <div className="current-user">
                    <span>{this.props.user.name}</span>
                    <div onClick={()=>{this.props.logout()}} title="Logout" className="logout">
                        <FaDoorOpen/>	
                    </div>
                </div>
			</div>
        )
    }
}