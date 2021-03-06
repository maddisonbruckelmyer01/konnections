import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class AdminUsers extends Component {

    //getting users on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_USERS'
        })
    }//end componentDidMount

    render() {
        const {classes} = this.props;
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.adminReducer,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AdminUsers));