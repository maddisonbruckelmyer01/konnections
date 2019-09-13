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

function* editBoard(action) {
    try {
        yield axios.put(`/api/admin/editBoard`, action.payload)
    }
    catch (error) {
        console.log('error on editing board', error)
    }
}


function* adminSaga() {
    yield takeLatest('FETCH_USERS', fetchUsers);
    yield takeLatest('EDIT_BOARD', editBoard)
}

export default adminSaga;