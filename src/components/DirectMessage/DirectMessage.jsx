import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
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

    render() {
        const { classes } = this.props;   
        return (
            <div>  
            <Paper className={classes.root}>
                <Table className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Direct Message</TableCell>
                            <TableCell>Open Messages</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.messages.map((text) => {
                        return(<TableRow key={text.id}>
                            <TableCell>{text.receiver_username}</TableCell>
                            <TableCell><button onClick={() => {this.messagesClick(text.id)}}>Go To Messages</button></TableCell>
                            </TableRow>)
                    })}
                    </TableBody>
                </Table>
            </Paper>
                <button onClick={this.handleClick}>Create New Direct Message</button>
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


// {
//     this.props.messages.map((text) => {
//         return <p>{text}</p>
//     })
// }