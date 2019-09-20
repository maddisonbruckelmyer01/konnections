import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserPage from '../UserPage/UserPage';

const styles = theme => ({
    container: {
        display: 'center',
        flexWrap: 'wrap',
        align: 'inline-blick'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
})

class AddNewCounselor extends Component {

    state = {
        name: '',
        website: '',
        phone_number: '',
        description: ''
    }

    //sets inputs to local state
    handleChange = (event, property) => {
        event.preventDefault()
        this.setState ({
            ...this.state,
            [property]: event.target.value
        })
    }//end handleChange

    //sends new counselors to the database
    handleClick = (event) => {
        event.preventDefault();
        console.log('clicked');
        this.props.dispatch({
            type: 'ADD_NEW_COUNSELOR',
            payload: this.state
        })
        this.props.history.push('/admin')
    }//end handleClick

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
            <UserPage />
                    <TextField
                        id="filled-mutiline-flexible"
                        label="Name of Counselor"
                        multiline
                        rowsMax="4"
                        onChange={(event, property) => {
                            this.handleChange(event, 'name')
                        }}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />

                    <TextField 
                        id="filled-mutiline-flexible"
                        label="Website Address"
                        multiline
                        rowsMax="4"
                        onChange={(event, property) => {
                            this.handleChange(event, 'website')
                        }}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                  <p>If they have no phone number put "No Phone Number" in the text box!</p>
                    <TextField 
                        id="filled-mutiline-flexible"
                        label="Phone Number"
                        multiline
                        rowsMax="4"
                        onChange={(event, property) => {
                            this.handleChange(event, 'phone_number')
                        }}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                    
                    <TextField 
                        id="filled-mutiline-flexible"
                        label="Description of what they help with"
                        multiline
                        rowsMax="4"
                        onChange={(event, property) => {
                            this.handleChange(event, 'description')
                        }}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    /> 
                   
                    <Button onClick={this.handleClick}>Submit</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        counselors: state.counselorsReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddNewCounselor));