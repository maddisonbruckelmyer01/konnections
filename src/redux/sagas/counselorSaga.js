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

function* counselorSaga() {
    yield takeLatest('FETCH_COUSELORS', fetchCounselors)
}

export default counselorSaga;