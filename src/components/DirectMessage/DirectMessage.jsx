import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UserPage from '../UserPage/UserPage';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
       margin: '0px 100px 0px 100px'
    },
    card: {
        maxWidth: '260px',
        maxLength: '150px',
        marginLeft: '24px',
        marginBottom: '24px'
    },
    content: {
        marginLeft: '5px'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: '12px'
    },
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none',
    }
});

class DirectMessage extends Component {

    componentDidMount () {
        this.getDirectMessages();
    }//end componentDidMount

    //get direct messages from the database
    getDirectMessages = () => {
        this.props.dispatch({
            type: 'FETCH_DIRECT_MESSAGES'
        })
    }//end getDirectMessages

    //go to create new direct message page
    handleClick = () => {
        console.log('clicked')
        this.props.history.push('/createNewDirectMessage')
    }//end handleClick

    //go to specific direct messages
    messagesClick = (receiver_username) => {
        this.props.history.push(`/directMessage/${receiver_username}`)
    }//end messagesClick

    render() {
        const { classes } = this.props;   
        return (
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserPage />
                </Grid>
                {this.props.messages.map((text) => {
                    return (<>
                        <Card className={classes.card}>
                            <CardContent className={classes.conent}>
                                <Typography variant="h6" component="h3">
                                {text.receiver_username}
                                </Typography>
                                <Button className={classes.button} onClick={() => {this.messagesClick(text.receiver_username)}} color="secondary">Go To Messages</Button>
                            </CardContent>
                        </Card>
                        </>)
                })}
                <Grid item xs={12}>
                    <Button color="secondary" onClick={this.handleClick}>Create New Message</Button>
                </Grid>
            </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      messages: state.directMessagesReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(DirectMessage)); 