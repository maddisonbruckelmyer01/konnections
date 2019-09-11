import React, {Component} from 'react';
import {connect} from 'react-redux';

class Boards extends Component {

    state = {
        newMessage: ''
    }

    componentDidMount() {
        this.getBoards()
    
    }//end componentDidMount

    getSpecificBoard = (id) => {
        console.log(id)
        this.props.dispatch({
            type: 'FETCH_SPECIFIC_BOARD',
            payload: id
        })
    }

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

    //send new message to the database
    handleSend = (id) => {
        console.log('in send');
        this.props.dispatch({
            type: 'SEND_MESSAGE',
            payload: {
                message: this.state.newMessage,
                board_id: id
            }
        })
    }//end handle send

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
        this.getSpecificBoard(id)
        // this.getMessages(id)
        this.props.history.push(`/board/${id}`)
    }//end boardClicker

    render() {

        // let boardsToDom = this.props.boards.map((board) => {
        //     let messagesToDom = this.props.messages.map((message) => {
        //         return <p>{message.message} {message.board_id}</p>
        //     })
        //     return (
        //         <> 
        //             <h3 key={board.id}>{board.board_name}</h3>
        //             <p>{board.description}</p>
        //             {messagesToDom}
        //             <input placeholder="New Message" type="text" onChange={this.handleChange} />
        //             <button onClick={() => this.handleSend(board.id)}>Send</button>
        //         </>
        //     )
        // })
        
        return (
            <div>
            {/* <pre>{JSON.stringify(this.state.newMessage)}</pre> */}
               {/* {
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
               } */}
               {/* {boardsToDom} */}

               {
                   this.props.boards.map(board => {
                     return  ( <><h1 key={board.id} onClick={() => {this.boardClicker(board.id)}}>
                         {board.board_name}
                    </h1>
                     <h3>{board.description}</h3> </>)
                   })
               }
                
                {/* {
                    this.props.messages.map((message) => {
                        return (<p>{message.message} {message.board_id} {message.user_id}</p>)
                    })
                } */}
                <button onClick={this.handleNewDirectClick}>New Direct Message</button>
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