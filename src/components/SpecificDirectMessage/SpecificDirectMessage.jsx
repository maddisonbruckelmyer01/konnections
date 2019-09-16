import React, {Component} from 'react';
import {connect} from 'react-redux';

class SpecificDirectMessage extends Component {

    state = {
        message: '',
        receiver_username: this.props.match.params.receiver_username,
        sender_username: 0
    }

    componentDidMount() {
        this.getMessages()
    }//end componentDidMount

    //get mesages from database
    getMessages = () => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES',
            payload: this.props.match.params.receiver_username
        })
    }//end getMessages

    //sets local state of input feild
    handleChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }//end handleChange

    //sends new message to database
    handleClick = () => {
        this.props.dispatch({
            type: 'SEND_DIRECT_MESSAGE',
            payload: this.state
        })
        document.getElementById('newMessage').value=''
        this.getMessages();

    }//end handleClick



    render() {
        console.log(this.state)
        return (
            <div>
            {
                this.props.specificMessages.map((text) => {
                    return <p>{text.sender_username}: {text.message}</p>
                })
            }
            <input id="newMessage" placeholder="New Message" type="text" onChange={this.handleChange}/>
            <button onClick={this.handleClick}>Send Message</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        specificMessages: state.directMessagesReducer
    }
}

export default connect(mapStateToProps)(SpecificDirectMessage);