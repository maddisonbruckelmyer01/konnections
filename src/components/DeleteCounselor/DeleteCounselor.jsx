import React, {Component} from 'react';
import  {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    }
});


class DeleteCounselor extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_COUNSELORS'
        })
    }//end componentDidMount

    //delete counselor
    handleDelete = (id) => {
        console.log('in delete')
        this.props.dispatch({
            type: 'DELETE_COUNSELOR',
            payload: id
        })
    }//end handleDelete

    render() {
        const {classes}=this.props;
        return (
           <div>
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
                               return(<TableRow key={counselor.id}>
                                   <TableCell>{counselor.name}</TableCell>
                                   <TableCell>{counselor.website}</TableCell>
                                   <TableCell>{counselor.phone_number}</TableCell>
                                   <TableCell>{counselor.description}</TableCell>
                                   <TableCell><button onClick={() => {this.handleDelete(counselor.id)}}>Delete</button></TableCell>
                               </TableRow>)
                           })
                           }
                       </TableBody>
                   </Table>
               </Paper>
           </div>

        )
    }
}

const mapStateToProps = state => {
    return {
    counselors: state.counselorReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(DeleteCounselor));