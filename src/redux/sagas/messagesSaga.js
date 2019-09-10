import axios from 'axios'; 
import { put, takeLatest } from 'redux-saga/effects';

function* sendMessage(action) {
    try {
        yield axios.post('/api/boards/sendMessage', action.payload)
        console.log(action.payload)
        // yield put({
        //     type: 'SET_BOARDS'
        // })
    }
    catch(error) {
        console.log('error on sending message ', error);
    }
}

function* messagesSaga() {
    yield takeLatest('SEND_MESSAGE', sendMessage);
}

export default messagesSaga;