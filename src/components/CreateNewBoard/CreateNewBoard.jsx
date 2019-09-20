import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import UserPage from '../UserPage/UserPage';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    input: {
        margin: theme.spacing.unit
    }
})

class CreateNewBoard extends Component {
    state = {
            board_name:'',
            description: ''
    }

    handleNameChange = (event) => {
        event.preventDefault()
        this.setState({
                board_name: event.target.value
        })
    }//end handleNameChange

    handleDescriptionChange = (event) => {
        event.preventDefault()
        this.setState({
            description: event.target.value
        })
    }//end handleDescriptionChange

    handleClick = (event) => {
        event.preventDefault()
        console.log('clicked')
        this.props.dispatch({
            type: 'ADD_BOARD',
            payload: this.state
        })
    this.props.history.push('/boards') 
    document.getElementById('name', 'description').value='';
    }//end handleClick

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
            <UserPage />
                <form>
                <Input
                    placeholder="Name of board"
                    id="name"
                    className={classes.input}
                    onChange={this.handleNameChange}
                    inputProps={{
                        'aria-label': 'Description'
                    }}
                />
                <Input
                    placeholder="Description of board"
                    id="description"
                    className={classes.input}
                    onChange={this.handleDescriptionChange}
                    inputProps={{
                        'aria-label': 'Description'
                    }}
                />
                <Button onClick={this.handleClick}>
                Create Board
                </Button>
                </form>
            </div>
        )
    }
}

export default connect()(withStyles(styles)(CreateNewBoard));