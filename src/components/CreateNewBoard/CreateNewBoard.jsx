import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateNewBoard extends Component {
    state = {
            board_name:'',
            description: ''
    }

    handleNameChange = (event) => {
        event.preventDefault()
        this.setState({
                board_name: event.target.value
        })
    }//end handleNameChange

    handleDescriptionChange = (event) => {
        event.preventDefault()
        this.setState({
            description: event.target.value
        })
    }//end handleDescriptionChange

    handleClick = (event) => {
        event.preventDefault()
        console.log('clicked')
        this.props.dispatch({
            type: 'ADD_BOARD',
            payload: this.state
        })
    alert('Your board has been created!')
    this.props.history.push('/boards') 
    }//end handleClick

    render() {
        return (
            <div>
                {JSON.stringify(this.state)}
                <form>
                <input placeholder="Name of board" onChange={this.handleNameChange}/>
                <input placeholder="Description of board" onChange={this.handleDescriptionChange} />
                <input type="button" value="Create Board" onClick={this.handleClick} />
                </form>
            </div>
        )
    }
}

export default connect()(CreateNewBoard);