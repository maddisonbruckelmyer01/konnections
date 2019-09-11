import axios from 'axios'; 
import { put, takeLatest } from 'redux-saga/effects';

//send messages
function* sendMessage(action) {
    try {
        yield axios.post('/api/boards/messages/sendMessage', action.payload)
        console.log(action.payload)
        // yield put({
        //     type: 'GET_MESSAGE'
        // })
    }
    catch(error) {
        console.log('error on sending message ', error);
    }
}

//get messages
function* fetchMessages(action) {
    try{
    let response = yield axios.get(`/api/boards/messages/${action.payload}`)
        console.log(response.data);
        yield put({
            type: 'GET_MESSAGE',
            payload: response.data
        })
    }
    catch(error) {
        console.log('error on gettting messages ', error); 
    }
}

function* messagesSaga() {
    yield takeLatest('SEND_MESSAGE', sendMessage);
    yield takeLatest('FETCH_MESSAGES', fetchMessages)
}

export default messagesSaga;