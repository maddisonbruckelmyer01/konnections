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

function* addBoard(action) {
    try{
        yield axios.post('/api/boards/addNew', action.payload)
        console.log(action.payload)
        yield put({
            type: 'FETCH_BOARDS'
        })
    }
    catch(error) {
        console.log('Adding board post error', error)
    }
}

function* boardsSaga() {
    yield takeLatest('FETCH_BOARDS', fetchBoards);
    yield takeLatest('ADD_BOARD', addBoard);
}

export default boardsSaga;