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
       margin: '0px 100px 0px 100px'
    },
   button: {
       margin: theme.spacing.unit
   },
    card: {
        maxWidth: '250px',
        maxLength: '100px',
        marginLeft: '24px',
        marginBottom: '24px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: '12px',
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
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserPage />
                </Grid>
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
                            <Button size="small" onClick={() => {this.boardClicker(board.id)}}>Go to board</Button>
                        </CardActions>
                    </Card>
                    <br></br>
                    </>)
            })}
            <Grid item xs={12}>
                <Button onClick={this.handleNewBoardClick}>Create new board</Button>
            </Grid>
                </Grid>
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