import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserPage from '../UserPage/UserPage';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
})


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
        const {classes} = this.props;
        return (
            <div>
            <UserPage />
            <h3>Usernames to pick from:</h3>
            {
                this.props.users.map((user) => {
                    return <li>{user.generated_username}</li>
                })
            }  
                <div className={classes.container}>
                    <TextField
                        id="filled-mutiline-flexible"
                        label="Username"
                        multiline
                        rowsMax="4"
                        onChange={this.handleUsername}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        id="filled-mutiline-flexible"
                        label="New Message"
                        multiline
                        rowsMax="4"
                        onChange={this.handleMessage}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                    <Button onClick={this.handleClick}>Send</Button>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsersReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CreateDirectMessage));