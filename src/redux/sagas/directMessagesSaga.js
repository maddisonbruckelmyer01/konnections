import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

function* fetchDirectMessages() {
    try {
        let response = yield axios.get('/api/directMessage');
        console.log('direct messages are', response.data)
        yield put ({
            type: 'SET_DIRECT_MESSAGES',
            payload: response.data
        })
    }
    catch (error) {
        console.log('direct messages get request error', error)
    }
}

function* sendDirectMessages(action) {
    try {
        yield axios.post('/api/directMessage/sendDirectMessage', action.payload);
        console.log(action.payload)
        Swal.fire({
            type: 'success',
            text: 'Your message has been sent!'
        })
    }
    catch (error) {
        Swal.fire({
            type: 'error',
            title: 'Opps...',
            text: 'That username does not exist!'
        })
        console.log('direct messages post request error', error)
    }
}

function* fetchSpecificDirectMessages(action) {
    try{
        let response = yield axios.get(`/api/directMessage/${action.payload}`, action.payload)
        console.log('action.payload is ', action.payload)
        console.log('the response is ', response)
        yield put ({
            type: 'SET_DIRECT_MESSAGES',
            payload: response.data
        })
    }
    catch (error) {
        console.log('error on getting specific direct messages', error)
    }
}

function* directMessagesSaga() {
    yield takeLatest('FETCH_DIRECT_MESSAGES', fetchDirectMessages);
    yield takeLatest('SEND_DIRECT_MESSAGE', sendDirectMessages);
    yield takeLatest('FETCH_MESSAGES_SPECIFIC', fetchSpecificDirectMessages);
}

export default directMessagesSaga;