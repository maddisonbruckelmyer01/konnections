import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserPage from '../UserPage/UserPage';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
   },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <UserPage />
            {this.props.boards.map((board) => {
                return(<> 
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {board.board_name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {board.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => { this.boardClicker(board.id) }}>Go to board</Button>
                        </CardActions>
                    </Card>
                    </>)
            })}
            <Button onClick={this.handleNewBoardClick}>Create new board</Button>
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