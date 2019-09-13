import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchCounselors() {
    try{
    let response = yield axios.get('/api/counselors');
    yield put({
        type: 'SET_COUSELORS',
        payload: response.data
    })
    }
    catch(error) {
        console.log('Counselor get request error', error);
    }
}

function*  addNewCounselor() {
    try{
        yield axios.post('/api/counselors/addNew')

    }
    catch(error) {
        console.log('Adding counselor error', error);
    }
}

function* deleteCounselor(action) {
    try{
        yield axios.delete(`/api/counselors/deleteCounselor/${action.payload}`, action.payload)
        yield put({
            type: 'FETCH_COUNSELORS'
        })
    }
    catch(error) {
        console.log('Deleting counselor error', error)
    }
}

function* counselorSaga() {
    yield takeLatest('FETCH_COUNSELORS', fetchCounselors)
    yield takeLatest('ADD_NEW_COUNSELOR', addNewCounselor)
    yield takeLatest('DELETE_COUNSELOR', deleteCounselor)
}

export default counselorSaga;