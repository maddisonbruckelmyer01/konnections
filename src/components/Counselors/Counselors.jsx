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
    }
});

class Counselors extends Component {

    componentDidMount() {
        this.getCounselors()
    }//end componentDidMount

    getCounselors = () => {
        this.props.dispatch({
            type: 'FETCH_COUNSELORS'
        })
    }//end getCounselors

    render() {
        const {classes} = this.props;
        return (
            <div>
            <UserPage />
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.counselorReducer.map((counselor) => {
                        return(<TableRow key={counselor.id}>
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
    return{
    counselorReducer: state.counselorReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Counselors));