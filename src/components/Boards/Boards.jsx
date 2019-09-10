import React, {Component} from 'react';
import {connect} from 'react-redux';

class Boards extends Component {

    componentDidMount() {
        this.getBoards()
    }//end componentDidMount

    getBoards = () => {
        this.props.dispatch({
            type:'FETCH_BOARDS'
        })
    }//end getBoards

    render() {
        return (
            <div>
               {
                   this.props.boards.map((board) => {
                       return <><h3>{board.board_name}</h3><p>{board.description}</p></>
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