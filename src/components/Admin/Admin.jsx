import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Counselors from '../Counselors/Counselors';


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

class Admin extends Component {
    //getting users on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_USERS'
        })
        this.getBoards();
        this.getCounselors();   
    }//end componentDidMount

    //get boards on page load
    getBoards = () => {
        this.props.dispatch({
            type: 'FETCH_BOARDS'
        })
    }//end componentDidMount

    //get counselors
    getCounselors = () => {
        this.props.dispatch({
            type: 'FETCH_COUNSELORS'
        })
    }//end get counselors

    //delete counselor
    handleDelete = (id) => {
        console.log('in delete')
        this.props.dispatch({
            type: 'DELETE_COUNSELOR',
            payload: id
        })
        this.props.history.push('/admin')
    }//end handleDelete

    //goes to addnewcounselor page
    handleClick = () => {
        this.props.history.push('/admin/addNewCounselor')
    }//end handleClick
    
    //goes to deleteCounselor page
    handleDeleteClick = () => {
        this.props.history.push('/admin/deleteCounselor')
    }//end handleDeleteClick

    //deletes bored
    handleBoardDelete = (id) => {
        this.props.dispatch({
            type: 'DELETE_BOARD',
            payload: id
        })
    }// end handleBoardDelete

    handleEdit = (id) => {
        console.log('clicked', id)
        this.props.history.push(`/editBoard/${id}`)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <h1>Users:</h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Generated Username</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Birthday</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map((user) => {
                                return (<TableRow key={user.id}><TableCell>{user.username}</TableCell>
                                 <TableCell>{user.generated_username}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.birthday}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <button onClick={this.handleClick}>Add New Counselor</button>
                <h1>Counselors:</h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.counselors.map((counselor) => {
                                return (<TableRow key={counselor.id}>
                                    <TableCell>{counselor.name}</TableCell>
                                    <TableCell><a href={counselor.website} target="_blank">Website</a></TableCell>
                                    <TableCell>{counselor.phone_number}</TableCell>
                                    <TableCell>{counselor.description}</TableCell>
                                    <TableCell><button onClick={() => { this.handleDelete(counselor.id) }}>Delete</button></TableCell>
                                </TableRow>)
                            })
                            }
                        </TableBody>
                    </Table>
                </Paper>
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
                            {this.props.boards.map((board) =>{
                                return (<TableRow key={board.id}>
                                        <TableCell>{board.board_name}</TableCell>
                                        <TableCell>{board.description}</TableCell>
                                        <TableCell><button onClick={() => {this.handleEdit(board.id)}}>Edit</button></TableCell>
                                        <TableCell><button onClick={() => {this.handleBoardDelete(board.id)}}>Delete</button></TableCell>
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
        users: state.adminReducer,
        boards: state.boardsReducer,
        counselors: state.counselorReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Admin)); 

