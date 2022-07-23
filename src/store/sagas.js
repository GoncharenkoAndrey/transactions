import {put, takeLatest} from "redux-saga/effects";
import axios from "../api/transactions";
import {
    FETCH_TRANSACTIONS,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILED
} from "../reducers/actions";

function* fetchTransactions() {
    try {
       const response = yield axios.get("/transactions");
       yield put({type: FETCH_TRANSACTIONS_SUCCESS, transactions: response.data});
    } catch (e) {
       yield put({type: FETCH_TRANSACTIONS_FAILED, message: e.message});
    }
 }

 function* transactionsSaga() {
    yield takeLatest(FETCH_TRANSACTIONS, fetchTransactions);
 }

 export default transactionsSaga;