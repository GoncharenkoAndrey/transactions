import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchTransactionsAction} from "../reducers/transactions";
import List from "./List";

function Transactions ({transactions, filter, fetchTransactions}) {
    let filtered = transactions;

    useEffect(() => {
        fetchTransactions();
    }, []);

    if(filter.statusFilter !== "All") {
        const keys = Object.keys(transactions);
        filtered = {};
        keys.map((key) => {
            if(transactions[key].Status === filter.statusFilter) {
                filtered[key] = transactions[key];
            }
        });
    }
    if(filter.typeFilter !== "All") {
        const statusFiltered = {};
        const keys = Object.keys(filtered);
        keys.map((key) => {
            if(filtered[key].Type === filter.typeFilter){
                statusFiltered[key] = filtered[key];
            }
        });
        filtered = statusFiltered;
    }

    return (
        <div>
            <List transactions = {filtered} />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        transactions: state.transactions
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactions: () => dispatch(fetchTransactionsAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);