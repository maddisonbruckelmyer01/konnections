import React, {Component} from 'react';
import AdminBoards from './AdminBoards';
import AdminCounselors from './AdminCounselors';
import AdminUsers from './AdminUsers';
import UserPage from '../UserPage/UserPage';
import {connect} from 'react-redux';

class Admin extends Component {
    render() {
       
        return (
            <div>
                
                <UserPage />
                <AdminUsers />
                <AdminCounselors />
                <AdminBoards />
            </div>
        )
        }

}

const mapStateToProps = state => {
    return {
        users: state.userReducer
    }
}


export default connect(mapStateToProps)(Admin); 

