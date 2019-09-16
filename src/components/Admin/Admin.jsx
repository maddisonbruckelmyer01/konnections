import React, {Component} from 'react';
import AdminBoards from './AdminBoards';
import AdminCounselors from './AdminCounselors';
import AdminUsers from './AdminUsers';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales'

const date = 198784740;

Moment.globalMoment = moment;

class Admin extends Component {
    render() {
        return (
            <div>
                <Moment onChange={(val) => {console.log(val) }}>1976-04-19T12:59-0500</Moment>
                <AdminUsers />
                <AdminCounselors />
                <AdminBoards />
            </div>
        )
    }
}


export default Admin; 

