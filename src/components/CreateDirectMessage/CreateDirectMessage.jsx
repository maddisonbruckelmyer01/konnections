import React, {Component} from 'react';
import {connect} from 'react-redux';


class CreateDirectMessage extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_USERS'
        })
    }//end componentDidMount

    state = { 
        receiver_username: '',
        message: ''
    }

    //sets receiver's username in local state
    handleUsername = (event) => {
        event.preventDefault();
        this.setState({
            receiver_username: event.target.value
        })
    }//end handleUsername

    //sets message in local state
    handleMessage = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        })
    }//end handleMessage

    //sends message to database
    handleClick = (event) => {
        event.preventDefault();
        console.log('clicked');
        this.props.dispatch({
            type: 'SEND_DIRECT_MESSAGE',
            payload: this.state
        })
        this.props.history.push(`/directMessage`)
    }//end handleClick

    render() {
        return (
            <div>
            <h3>Usernames to pick from:</h3>
            {
                this.props.users.map((user) => {
                    return <li>{user.generated_username}</li>
                })
            }
                <form>
                    <input placeholder="Username" type="text" onChange={this.handleUsername}/>
                    <input placeholder="New Message" type="text" onChange={this.handleMessage}/>
                    <input type="button" value="Send" onClick={this.handleClick}/>
                </form>     
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsersReducer
    }
}

export default connect(mapStateToProps)(CreateDirectMessage);