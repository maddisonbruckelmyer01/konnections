import React, {Component} from 'react';
import AdminBoards from './AdminBoards';
import AdminCounselors from './AdminCounselors';
import AdminUsers from './AdminUsers';
import UserPage from '../UserPage/UserPage';

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


export default Admin; 

