import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    input: {
        margin: theme.spacing.unit
    }
})

class EditBoard extends Component {
 
    //sends the edit to the database
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submited')
        this.props.dispatch({
            type: 'EDIT_BOARD',
            payload: this.props.board
        })
        this.props.history.push('/admin')
        this.props.dispatch({
            type: 'FETCH_BOARDS'
        })
    }//end handleSubmit

    //cancles the edit
    handleCancel = (event, property) => {
        event.preventDefault();
        console.log('canceled')
        this.props.history.push('/admin')
    }//end handleCancel

    render() {
       const { classes } = this.props;
        return (
            <div className={classes.container}>
                <form>
                <Input 
                    value={this.props.board.board_name}
                    type="text"
                    className={classes.input}
                    onChange={(event) => {
                            this.props.dispatch({
                                type: 'EDIT_BOARD_NAME',
                                payload: event.target.value
                            })
                        }} 
                    inputProps={{
                        'aria-label': 'Description'
                    }}
                />

                <Input
                    value={this.props.board.description}
                    type="text"
                    onChange={(event) => {
                        this.props.dispatch({
                            type: 'EDIT_BOARD_DESCRIPTION',
                            payload: event.target.value
                        })
                    }}
                    inputProps={{
                        'aria-label' : 'Description'
                    }}
                    className={classes.input}
                />

                <Button onClick={this.handleSubmit}>Submit</Button>
                
                <Button onClick={this.handleCancel}>Cancel</Button>
                </form>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.editBoardReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EditBoard));