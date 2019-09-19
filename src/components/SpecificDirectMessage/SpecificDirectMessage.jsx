import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    inputInput: {
        margin: theme.spacing.unit
    }
})

class SpecificDirectMessage extends Component {

    state = {
        message: '',
        receiver_username: this.props.match.params.receiver_username,
        sender_username: 0,
    }

    componentDidMount() {
        this.getMessages()
    }//end componentDidMount

    //get mesages from database
    getMessages = () => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES_SPECIFIC',
            payload: this.props.match.params.receiver_username
        })
    }//end getMessages

    //sets local state of input feild
    handleChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }//end handleChange

    //sends new message to database
    handleClick = () => {
        this.props.dispatch({
            type: 'SEND_DIRECT_MESSAGE',
            payload: this.state
        })
        document.getElementById('newMessage').value='';
        this.getMessages();

    }//end handleClick



    render() {
        console.log(this.state)
        const {classes} = this.props;
        return (
            <div>
            {
                this.props.specificMessages.map((text) => {
                    return <p key={text.id}>{text.sender_username}: {text.message}</p>
                })
            }
            <div className={classes.container}>
                <Input
                    id="newMessage"
                    placeholder="New Message"
                    onChange={this.handleChange}
                    className={classes.inputInput}
                    inputProps={{
                        'aria-label': 'Description'
                    }}
                />
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>Send Message</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        specificMessages: state.directMessagesReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SpecificDirectMessage));