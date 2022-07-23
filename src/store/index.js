import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {transactionsReducer} from "../reducers/transactions";
import {filterReducer} from '../reducers/filter';
import transactionsSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filter: filterReducer
  },
  middleware: [sagaMiddleware],
  devTools: "window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()"
});

sagaMiddleware.run(transactionsSaga);

export default store;


