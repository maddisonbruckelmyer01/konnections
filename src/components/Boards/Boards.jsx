import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserPage from '../UserPage/UserPage';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
   button: {
       margin: theme.spacing.unit
   },
   input: {
       display: 'none'
   },
   gridRoot: {
       flexGrow: 1
   },
   paper: {
       padding: theme.spacing.unit *2,
       textAlign: 'center',
       color: theme.palette.text.secondary
   }
});

class Boards extends Component {

    componentDidMount() {
        this.getBoards()
    
    }//end componentDidMount

    getSpecificBoard = (id) => {
        console.log(id)
        this.props.dispatch({
            type: 'FETCH_SPECIFIC_BOARD',
            payload: id
        })
    }//end getSpecificBoard

    //get messages from database
    getMessages = (id) => {
        this.props.dispatch({
            type: 'FETCH_MESSAGES',
            payload: id
        })
    }//end get messages

    //get boards from database
    getBoards = () => {
        this.props.dispatch({
            type:'FETCH_BOARDS'
        })
    }//end getBoards

    //set local state for new message
    handleChange = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }//end handleChange

    //create a new board click
    handleNewBoardClick = () => {
        console.log('new board clicked');
        this.props.history.push('/createNewBoard');
    }//end handleNewBoardClick

    //click on board name and see specific board with those messages
    boardClicker = (id) => {
        console.log('board clicked')
        this.props.history.push(`/board/${id}`)
    }//end boardClicker

    render() {
        const { classes } = this.props;
        return (
            <div>
            <UserPage />
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center"
            ></Grid>
            <Paper className={classes.root}>
                <Table className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Go To Board</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.boards.map((board)=>{
                        return (<TableRow key={board.id}>
                            <TableCell>{board.board_name}</TableCell>
                            <TableCell>{board.description}</TableCell>
                            <TableCell>
                                <Button 
                                    className={classes.button}
                                    onClick={() => {this.boardClicker(board.id)}}
                                >
                                    Go To Board
                                </Button>
                            </TableCell>
                            </TableRow>)
                    })}
                    </TableBody>
                </Table>
            </Paper>
                <Button 
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleNewBoardClick}
                >
                    Create a new board
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardsReducer,
        messages: state.messagesReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Boards));