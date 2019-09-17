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

class AdminCounselors extends Component {

    componentDidMount () {
        this.getCounselors();
    }//end componentDidMount

    //get counselors from database
    getCounselors = () => {
        this.props.dispatch({
            type: 'FETCH_COUNSELORS'
        })
    }//end getCounselors

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

    render() {
        const {classes} = this.props;
        return (
            <div>
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
                                    <TableCell>
                                        <Button
                                            href={counselor.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={classes.button}
                                        >
                                            Open Website
                                        </Button>
                                    </TableCell>
                                    <TableCell>{counselor.phone_number}</TableCell>
                                    <TableCell>{counselor.description}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={() => { this.handleDelete(counselor.id) }}
                                        >
                                            Delete
                                        <DeleteIcon className={classes.rightIcon} />
                                        </Button>
                                    </TableCell>
                                </TableRow>)
                            })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleClick}
                >
                    Add New Counselor
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counselors: state.counselorReducer
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AdminCounselors)));