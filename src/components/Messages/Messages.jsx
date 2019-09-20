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

class Messages extends Component {

    state = {
        newMessage: ''
    }

    componentDidMount = () => {
       this.getMessages()
       this.getSpecificBoard()
    }//end componentDidMount

    //set local state for new message
    handleChange = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }//end handleChange

    //sends a new message to the database
    handleSend = (id) => {
        console.log('in send');
        this.props.dispatch({
            type: 'SEND_MESSAGE',
            payload: {
                message: this.state.newMessage,
                board_id: id
            }
        })
        document.getElementById('newMessage').value='';
    }//end handleSend

    //get messages from database
    getMessages = (id) => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES',
            payload: this.props.match.params.id
        })
    }//end get messages

    //get specific board from the database
    getSpecificBoard = (id) => {
        console.log(id)
        this.props.dispatch({
            type: 'FETCH_SPECIFIC_BOARD',
            payload: this.props.match.params.id
        })
    }//end getSpecificBoard


    render() {
        const {classes} = this.props;
        let messagesToDom = this.props.messages.map((message) => {
            return <p>{message.generated_username}: {message.message}</p>
        })
        return (
            <div>
            <UserPage />
                <h1>{this.props.specificBoard.board_name}</h1>
                <p>{this.props.specificBoard.description}</p>
                {messagesToDom}
                <TextField  
                    id="filled-mutiline-flexible"
                    id="newMessage"
                    label="New Message"
                    multiline
                    rowsMax= "4"
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
                <Button onClick={() => this.handleSend(this.props.specificBoard.id)}>Send</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        specificBoard: state.specificBoardReducer,
        messages: state.messagesReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Messages));