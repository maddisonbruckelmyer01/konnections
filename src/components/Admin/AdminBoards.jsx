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
    handleEdit = (id) => {
        console.log('clicked', id)
        this.props.history.push(`/editBoard/${id}`)
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
                                    <TableCell><button onClick={() => { this.handleEdit(board.id) }}>Edit</button></TableCell>
                                    <TableCell><button onClick={() => { this.handleBoardDelete(board.id) }}>Delete</button></TableCell>
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
