import React, {Component} from 'react';
import {connect} from 'react-redux';

class EditBoard extends Component {
 
    //sends the edit to the database
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submited')
        this.props.dispatch({
            type: 'EDIT_BOARD',
            payload: this.props.board
        })
        this.props.history.push('/admin')
        this.props.dispatch({
            type: 'FETCH_BOARDS'
        })
    }//end handleSubmit

    //cancles the edit
    handleCancel = (event, property) => {
        event.preventDefault();
        console.log('canceled')
        this.props.history.push('/admin')
    }//end handleCancel

    render() {
       
        return (
            <div>
                <form>
                    <input 
                        value={this.props.board.board_name} 
                        type="text"
                        onChange={(event) => {
                            this.props.dispatch({
                                type: 'EDIT_BOARD_NAME',
                                payload: event.target.value
                            })
                        }} 
                    />
                    <input 
                        value={this.props.board.description} 
                        type="text"
                        onChange={(event) => {
                            this.props.dispatch({
                                type: 'EDIT_BOARD_DESCRIPTION',
                                payload: event.target.value
                            })
                        }} 
                    />
                    <input 
                        type="button" 
                        value="Submit" 
                        onClick={this.handleSubmit}
                    />
                    <input 
                        type="button" 
                        value="Cancel" 
                        onClick={this.handleCancel}
                    />
                </form>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.editBoardReducer
    }
}

export default connect(mapStateToProps)(EditBoard);