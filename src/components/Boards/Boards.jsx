import React, {Component} from 'react';
import {connect} from 'react-redux';

class Boards extends Component {

    componentDidMount() {
        this.getBoards()
    
    }//end componentDidMount

    getSpecificBoard = (id) => {
        console.log(id)
        this.props.dispatch({
            type: 'FETCH_SPECIFIC_BOARD',
            payload: id
        })
    }//end getSpecificBoard

    //get messages from database
    getMessages = (id) => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES',
            payload: id
        })
    }//end get messages

    //get boards from database
    getBoards = () => {
        this.props.dispatch({
            type:'FETCH_BOARDS'
        })
    }//end getBoards

    //set local state for new message
    handleChange = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }//end handleChange

    //create a new board click
    handleNewBoardClick = () => {
        console.log('new board clicked');
        this.props.history.push('/createNewBoard');
    }//end handleNewBoardClick

    //create a new direct message click
    handleNewDirectClick = () => {
        console.log('new direct message clicked')
        this.props.history.push('/directMessage')
    }//end handleNewDirectClick

    //click on board name and see specific board with those messages
    boardClicker = (id) => {
        console.log('board clicked')
        this.props.history.push(`/board/${id}`)
    }//end boardClicker

    render() {
        
        return (
            <div>
               {
                   this.props.boards.map(board => {
                     return  ( <><h1 key={board.id} onClick={() => {this.boardClicker(board.id)}}>
                         {board.board_name}
                    </h1>
                     <h3>{board.description}</h3> </>)
                   })
               }
                <button onClick={this.handleNewDirectClick}>Direct Messages</button>
                <button onClick={this.handleNewBoardClick}>Create a new board</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        boards: state.boardsReducer,
        messages: state.messagesReducer
    }
}

export default connect(mapStateToProps)(Boards);