import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chance from 'chance';


let chance = new Chance();

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    generated_username: chance.word({length: 5}),
    admin: false
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          birthday: this.state.birthday,
          gender: this.state.gender,
          generated_username: this.state.generated_username,
          admin: this.state.admin
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="first_name">
            First Name: 
            <input 
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChangeFor('first_name')}
              required
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last Name:
              <input 
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
                required
                />
            </label>
          </div>
          <div>
            <label htmlFor="birthday">
              Birthday:
              <input 
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleInputChangeFor('birthday')}
                required
                />
            </label>
          </div>
          <div>
            <label htmlFor="gender">
              Gender:
              <input 
                name="gender"
                value={this.state.gender}
                onChange={this.handleInputChangeFor('gender')}
                required
                />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

