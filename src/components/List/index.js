import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {editTransactionAction, deleteTransactionAction} from "../../reducers/transactions";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import Transaction from "../Transaction";

function List({transactions, deleteTransaction, editTransaction}) {
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [transactionId, setTransactionId] = useState(undefined);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const onPage = 15;

    const keys = Object.keys(transactions);

    useEffect(() => {
        let pages = Math.floor(keys.length / onPage);
        pages = pages >= 1 ? pages : 1;
        if(keys.length - pages * onPage > 0) {
            pages++;
        }
        setPagesCount(pages);
    }, [transactions]);

    function editTransactionHandler(id) {
        setShowEdit(true);
        setTransactionId(id);
    }

    function deleteTransactionHandler(id) {
        setTransactionId(id);
        setShowDelete(true);
    }

    function editModalHandler(transaction) {
        if(transaction) {
            editTransaction(transaction);
        }
        setShowEdit(false);
    }

    function deleteModalHandler(result) {
        if(result) {
            deleteTransaction(transactionId);
            setTransactionId(undefined);
        }
        setShowDelete(false);
    }

    function firstPage() {
        setPage(1);
    }

    function lastPage() {
        setPage(pagesCount);
    }

    function changePage(pageChange) {
        setPage(page + pageChange);
    }

    function setPageHandler(event) {
        const page = event.target.innerText;
        setPage(page);
    }

    function renderPages() {
        const pageItems = [];
        for(let i = 1; i <= pagesCount; i++) {
            pageItems.push(
                <Pagination.Item key = {i} onClick = {setPageHandler}>{i}</Pagination.Item>
            );
        }
        return pageItems;
    }

    function renderTransactions() {
        const pageTransactions = [];
        const start = (page - 1) * onPage;
        
        if(keys.length) {
            let count;
            for(let i = start; i < start + onPage; i++) {
                if(i + 1 > keys.length) {
                    
                    break;
                }

                const key = keys[i];

                pageTransactions.push(
                    <Transaction
                        key={key}
                        transaction ={transactions[key]}
                        editTransaction = {editTransactionHandler}
                        deleteTransaction = {deleteTransactionHandler}
                    />
                );
                count = i;
            }
            for(let i = 0; i < start + onPage - (count + 1); i++) {
                pageTransactions.push(
                    <tr key = {"a" + i}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                );
            }
        }
        return pageTransactions;
    }

    return (
        <div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Client name</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderTransactions()
                    }
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick = {firstPage} />
                <Pagination.Prev onClick = {() => changePage(-1)} />
                {
                    renderPages()
                }
                <Pagination.Next onClick = {() => changePage(1)} />
                <Pagination.Last onClick = {lastPage} />
            </Pagination>
            {showEdit ? <EditModal
                show = {showEdit}
                transaction = {transactions[transactionId]}
                handleClose = {editModalHandler}
            /> : null}
            <DeleteModal show = {showDelete} handleClose = {deleteModalHandler} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTransaction: (id) => dispatch(editTransactionAction(id)),
        deleteTransaction: (id) => dispatch(deleteTransactionAction(id))
    };
};

export default connect(null, mapDispatchToProps)(List);