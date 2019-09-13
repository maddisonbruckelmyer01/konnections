import React, {Component} from 'react';
import {connect} from 'react-redux';


class AddNewCounselor extends Component {

    state = {
        name: '',
        website: '',
        phone_number: '',
        description: ''
    }

    //sets inputs to local state
    handleChange = (event, property) => {
        event.preventDefault()
        this.setState ({
            ...this.state,
            [property]: event.target.value
        })
    }//end handleChange

    //sends new counselors to the database
    handleClick = (event) => {
        event.preventDefault();
        console.log('clicked');
        this.props.dispatch({
            type: 'ADD_NEW_COUNSELOR',
            payload: this.state
        })
    }//end handleClick

    render() {
        return (
            <div>
                <form>
                    <label> Add Name: </label>
                    <input placeholder="Name of Counselor" type="text" onChange={(event, property) => {this.handleChange(event, 'name')}}/><br></br>
                    <label> Website Address:</label>
                    <input placeholder="Website Address" type="text" onChange={(event, property)=> {this.handleChange(event, 'website')}}/><br></br>
                    <label>Phone Number: </label>
                    {/* <p>If they do not have a phone number put "No Phone Number"</p> */}
                    <input placeholder="Phone Number" type="number" onChange={(event,property) => {this.handleChange(event, 'phone_number')}}/><br></br>
                    <label>Description of what they help with: </label>
                    <input placeholder="Description" type="text"onChange={(event, property) => {this.handleChange(event, 'description')}}/><br></br>
                    <input type="button" value="Submit" onClick={this.handleClick}/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        counselors: state.counselorsReducer
    }
}

export default connect(mapStateToProps)(AddNewCounselor);