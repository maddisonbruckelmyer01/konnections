import React, {Component} from 'react';
import AdminBoards from './AdminBoards';
import AdminCounselors from './AdminCounselors';
import AdminUsers from './AdminUsers';

class Admin extends Component {
    render() {
        return (
            <div>
                <AdminUsers />
                <AdminCounselors />
                <AdminBoards />
            </div>
        )
    }
}


export default Admin; 

