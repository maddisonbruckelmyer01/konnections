import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewMessage from '../NewMessage/NewMessage';

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
        event.preventDefault();
        this.setState({
            newMessage: event.target.value
        })
    }//end handleChange

    handleSend = (event) => {
        event.preventDefault();
        console.log('in send');
    }

    render() {
        return (
            <div>
            <pre>{JSON.stringify(this.state.newMessage)}</pre>
               {
                   this.props.boards.map((board) => {
                       return <><h3>{board.board_name}</h3><p>{board.description}</p></>
                   })
               }
               <form onClick={this.handleSend}>
               <input placeholder="New Message" type="text" onChange={this.handleChange}/>
               <input type="button" value="Send" />
            </form>
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