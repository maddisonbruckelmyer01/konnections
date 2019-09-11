import React, {Component} from 'react';
import {connect} from 'react-redux';

class Messages extends Component {

    state = {
        newMessage: ''
    }

    componentDidMount = () => {
       this.getMessages()
       this.getSpecificBoard()
    }//end componentDidMount

    //set local state for new message
    handleChange = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }//end handleChange

    //sends a new message to the database
    handleSend = (id) => {
        console.log('in send');
        this.props.dispatch({
            type: 'SEND_MESSAGE',
            payload: {
                message: this.state.newMessage,
                board_id: id
            }
        })
    }//end handleSend

    //get messages from database
    getMessages = (id) => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES',
            payload: this.props.match.params.id
        })
    }//end get messages

    //get specific board from the database
    getSpecificBoard = (id) => {
        console.log(id)
        this.props.dispatch({
            type: 'FETCH_SPECIFIC_BOARD',
            payload: this.props.match.params.id
        })
    }//end getSpecificBoard


    render() {

        let messagesToDom = this.props.messages.map((message) => {
            return <p>{message.message}</p>
        })
        return (
            <div>
                <h1>{this.props.specificBoard.board_name}</h1>
                <p>{this.props.specificBoard.description}</p>
                {messagesToDom}
                <input placeholder="New Message" type="text" onChange={this.handleChange} />
                <button onClick={() => this.handleSend(this.props.specificBoard.id)}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        specificBoard: state.specificBoardReducer,
        messages: state.messagesReducer
    }
}

export default connect(mapStateToProps)(Messages);