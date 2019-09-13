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

class EditBoards extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of Board</TableCell>
                                <TableCell>Board Description</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardsReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EditBoards));