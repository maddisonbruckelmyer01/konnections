import React, {Component} from 'react';
import {connect} from 'react-redux';



class EditBoard extends Component {

    state = {
        board_name: '',
        description: '',
        board_id: this.props.match.params.id
    }

    //sends the edit to the database
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submited')
        this.props.dispatch({
            type: 'EDIT_BOARD',
            payload: this.state
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

    //sends inputs to local state
    handleChange = (event, property) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }//end handleChange

    render() {
        return (
            <div>
                <form>
                    <input placeholder="name" type="text" onChange={(event, property) => {this.handleChange(event, 'board_name')}}/>
                    <input placeholder="description" type="text" onChange={(event, property) =>{this.handleChange(event, 'description')}}/>
                    <input type="button" value="Submit" onClick={this.handleSubmit}/>
                    <input type="button" value="Cancel" onClick={this.handleCancel}/>
                </form>
            </div>
        )
    }
}

export default connect()(EditBoard);