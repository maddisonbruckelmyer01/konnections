import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDirectMessages(action) {
    try {
        let response = yield axios.get('/api/directMessage');
        console.log(response)
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
    }
    catch (error) {
        console.log('direct messages post request error', error)
    }
}

function* directMessagesSaga() {
    yield takeLatest('FETCH_DIRECT_MESSAGES', fetchDirectMessages);
    yield takeLatest('SEND_DIRECT_MESSAGE', sendDirectMessages)
}

export default directMessagesSaga;