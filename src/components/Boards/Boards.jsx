import React, {Component} from 'react';
import {connect} from 'react-redux';

class Boards extends Component {

    state = {
        newMessage: ''
    }

    componentDidMount() {
        this.getBoards()
    }//end componentDidMount

    //get boards from database
    getBoards = () => {
        this.props.dispatch({
            type:'FETCH_BOARDS'
        })
    }//end getBoards

    //
    handleChange = (event) => {
        this.setState({
            newMessage: event.target.value,
        })
    }//end handleChange

    handleSend = (id) => {
        console.log('in send');
        this.props.dispatch({
            type: 'SEND_MESSAGE',
            payload: {
                message: this.state.newMessage,
                board_id: id
            }
        })
    }

    render() {
        return (
            <div>
            {/* <pre>{JSON.stringify(this.state.newMessage)}</pre> */}
               {
                   this.props.boards.map((board) => {
                       return (
                       <>
                            <h3 key={board.id}>{board.board_name}</h3>
                            <p>{board.description}</p>
                            <input placeholder="New Message" type="text" onChange={this.handleChange} />
                            <button onClick={() => this.handleSend(board.id)}>Send</button>
                       </>
                   )
                   })
               }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardsReducer
    }
}

export default connect(mapStateToProps)(Boards);