import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchBoards() {
    try{
        let response = yield axios.get('/api/boards');
        yield put ({
            type: 'SET_BOARDS',
            payload: response.data
        })
    } catch (error) {
        console.log('Boards get request error', error)
    }
}


function* boardsSaga() {
    yield takeLatest('FETCH_BOARDS', fetchBoards);
}

export default boardsSaga;