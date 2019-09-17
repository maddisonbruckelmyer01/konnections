import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    }
});

class AdminBoards extends Component {

    componentDidMount() {
        this.getBoards();
    }//end componentDidMount

    //get boards on page load
    getBoards = () => {
        this.props.dispatch({
            type: 'FETCH_BOARDS'
        })
    }//end getBoards

    //deletes bored
    handleBoardDelete = (id) => {
        this.props.dispatch({
            type: 'DELETE_BOARD',
            payload: id
        })
    }// end handleBoardDelete

    //edits board
    handleEdit = (board) => {
        console.log('clicked', board)
        this.props.history.push(`/editBoard/${board.id}`)
        this.props.dispatch({
            type: 'GET_ALL',
            payload: board
        })
    }//end handleEdit

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1>Boards: </h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of Board</TableCell>
                                <TableCell>Description of Board</TableCell>
                                <TableCell>Edit Board</TableCell>
                                <TableCell>Delete Board</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.boards.map((board) => {
                                return (<TableRow key={board.id}>
                                    <TableCell>{board.board_name}</TableCell>
                                    <TableCell>{board.description}</TableCell>
                                    <TableCell>
                                        <button 
                                            onClick={() => { this.handleEdit(board) }}
                                        >
                                            Edit
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            className={classes.button} 
                                            onClick={() => { this.handleBoardDelete(board.id) }}
                                        >
                                            Delete 
                                        <DeleteIcon className={classes.rightIcon} />
                                        </Button>
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardsReducer
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AdminBoards)));  
