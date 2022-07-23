import {createAction} from '@reduxjs/toolkit'
import {
    ADD_TRANSACTION,
    EDIT_TRANSACTION,
    DELETE_TRANSACTION,
    FETCH_TRANSACTIONS,
    FETCH_TRANSACTIONS_SUCCESS,
} from './actions';

const initialState = {};

export const fetchTransactionsAction = createAction(FETCH_TRANSACTIONS);
export const addTransactionAction = createAction(
    ADD_TRANSACTION,
    function prepare(transaction) {
        return {payload: transaction};
    }
);
export const editTransactionAction = createAction(EDIT_TRANSACTION, function prepare(transaction) {
    return {payload: transaction};
});
export const deleteTransactionAction = createAction(DELETE_TRANSACTION, function prepare(id) {
    return {payload: id};
});

export const transactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TRANSACTION:
            action.payload.Amount = action.payload.Amount.substring(1, action.payload.Amount.length)
            return {...state, [action.payload.TransactionId]: {...action.payload}};
        case EDIT_TRANSACTION:
            const newTransactions = {...state};
            newTransactions[action.payload.TransactionId] = {...action.payload};
            return newTransactions;
        case DELETE_TRANSACTION:
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        case FETCH_TRANSACTIONS_SUCCESS:
            const transactions = {};
            action.transactions.map((transaction) => {
                transactions[transaction.TransactionId] = {...transaction};
            });
            return transactions;
        default:
            return state;
    }
};

