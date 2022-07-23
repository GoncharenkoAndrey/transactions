import React, {useState} from "react";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {editTransactionAction, deleteTransactionAction} from "../../reducers/transactions";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import "./List.css";

function List({transactions, deleteTransaction, editTransaction}) {
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [transactionId, setTransactionId] = useState(undefined);
    const [startItem, setStartItem] = useState(1);
    const onPage = 15;

    const keys = Object.keys(transactions);

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

    function setPageHandler(event) {
        const page = event.target.innerText;
        let start = 1;
        if(page > 1) {
            start = (page - 1) * onPage + 1;
        }
        setStartItem(start);
    }

    function renderPages() {
        let pages = Math.floor(keys.length / onPage);
        const pageItems = [];
        pages = pages >= 1 ? pages : 1;
        if(keys.length - pages * onPage > 0) {
            pages++;
        }
        for(let i = 1; i <= pages; i++) {
            pageItems.push(
                <Pagination.Item key = {i} onClick = {setPageHandler}>{i}</Pagination.Item>
            );
        }
        return pageItems;
    }

    function renderTransactions() {
        const pageTransactions = [];
        if(keys.length) {
            for(let i = startItem; i <= startItem + onPage - 1; i++) {
                const index = i - 1;
                if(i > keys.length) {
                    break;
                }
                const key = keys[index];

                pageTransactions.push(
                    <tr key={transactions[key].TransactionId}>
                        <td>{transactions[key].TransactionId}</td>
                        <td>{transactions[key].Status}</td>
                        <td>{transactions[key].Type}</td>
                        <td>{transactions[key].ClientName}</td>
                        <td>${transactions[key].Amount}</td>
                        <td>
                            <div className="actions">
                                <Button
                                    className = "actionButton editButton"
                                    variant = "light"
                                    onClick = {() => editTransactionHandler(key)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className = "actionButton"
                                    variant = "light"
                                    onClick = {() => deleteTransactionHandler(key)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </td>
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
                <Pagination.First />
                <Pagination.Prev />
                {
                    renderPages()
                }
                <Pagination.Next />
                <Pagination.Last />
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