import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get all users
function *fetchUsers(action){
    try{
        let response = yield axios.get('/api/admin/users')
        console.log(response)
        yield put({
            type: 'SET_USERS',
            payload: response.data
        })
    }
    catch(error) {
        console.log('error on getting users', error)
    }
}


function* adminSaga() {
    yield takeLatest('FETCH_USERS', fetchUsers);
}

export default adminSaga;