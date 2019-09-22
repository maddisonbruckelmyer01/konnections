import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import Swal from 'sweetalert2';

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

function* fetchSpecificBoard(action) {
    try{
        let response = yield axios.get(`/api/boards/${action.payload}`)
        console.log('saga response is', response.data)
        yield put ({
            type: 'SET_SPECIFIC_BOARD',
            payload: response.data
        })
    }
    catch(error) {
        console.log('error getting specific board', error);
    }
}

function* addBoard(action) {
    try{
        yield axios.post('/api/boards/addNew', action.payload)
        console.log(action.payload)
        Swal.fire({
            type: 'success',
            text: 'Your board has been created!'
        })
        yield put({
            type: 'FETCH_BOARDS'
        })
        yield put ({
            type: 'MESSAGE_BOARD_ADD'
        })
    }
    catch(error) {
        Swal.fire({
            type: 'error',
            text: 'Your board could not be created at this time, try again later!'
        })
        console.log('Adding board post error', error)
        action('Board has not been created!')
    }
}

function* deleteBoard(action) {
    try{
        yield axios.delete(`/api/boards/${action.payload}`, action.payload)
        yield put({
            type: 'FETCH_BOARDS'
        })
    }
    catch(error) {
        console.log('error on deleteing board', error)
    }
}



function* boardsSaga() {
    yield takeLatest('FETCH_BOARDS', fetchBoards);
    yield takeLatest('ADD_BOARD', addBoard);
    yield takeLatest('FETCH_SPECIFIC_BOARD', fetchSpecificBoard);
    yield takeLatest('DELETE_BOARD', deleteBoard)
}

export default boardsSaga;