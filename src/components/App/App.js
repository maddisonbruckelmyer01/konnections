import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Counselors from '../Counselors/Counselors';
import Boards from '../Boards/Boards';

import './App.css';
import CreateNewBoard from '../CreateNewBoard/CreateNewBoard';
import DirectMessage from '../DirectMessage/DirectMessage';
import Messages from '../Messages/Messages';
import CreateDirectMessage from '../CreateDirectMessage/CreateDirectMessage';
import Admin from '../Admin/Admin';
import AddNewCounselor from '../AddNewCounselor/AddNewCounselor';
import EditBoard from '../EditBoard/EditBoard';
import SpecificDirectMessage from '../SpecificDirectMessage/SpecificDirectMessage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute 
              exact
              path='/counselors'
              component={Counselors}
            />

            <ProtectedRoute
              exact
              path='/directMessage'
              component={DirectMessage}
            />

            <ProtectedRoute
              exact
              path='/directMessage/:receiver_username'
              component={SpecificDirectMessage}
            />

            <ProtectedRoute
              exact
              path='/boards'
              component={Boards}
            />

            <ProtectedRoute 
              exact
              path="/admin/addNewCounselor"
              component={AddNewCounselor}
            />

            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />

            <ProtectedRoute
              exact
              path="/board/:id"
              component={Messages}
            />

            <ProtectedRoute
              exact
              path='/admin'
              component={Admin}
            />

            <ProtectedRoute
              exact
              path="/editBoard/:id"
              component={EditBoard}
            />

            <ProtectedRoute
              exact
              path="/createNewBoard"
              component={CreateNewBoard}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />

            <ProtectedRoute
              exact
              path="/createNewDirectMessage"
              component={CreateDirectMessage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
