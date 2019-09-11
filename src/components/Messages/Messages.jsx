import React, {Component} from 'react';
import {connect} from 'react-redux';

class Messages extends Component {

    state = {
        newMessage: ''
    }

    componentDidMount = () => {
        // this.getMessages()
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

    render() {
        return (
            <div>
                <h1>{this.props.board.board_name}</h1>
                <p>{this.props.board.description}</p>
                {
                    this.props.messages.map((message) => {
                        return <p>{message.message}</p>
                    })
                }
                <input placeholder="New Message" type="text" onChange={this.handleChange} />
                <button onClick={() => this.handleSend(this.props.board.id)}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.specificBoardReducer,
        messages: state.messagesReducer
    }
}

export default connect(mapStateToProps)(Messages);