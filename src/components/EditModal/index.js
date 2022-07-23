import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./EditModal.css";

function EditModal({show, transaction, handleClose}) {
    const [editTransaction, setTransaction] = useState(transaction);

    function transactionTypeChange(event) {
        const value = event.target.value;
        setTransaction({...editTransaction, Type: value});
        console.log(editTransaction);
    }
    function clientNameChange(event) {
        const value = event.target.value;
        setTransaction({...editTransaction, ClientName: value});
    }
    function amountChange(event) {
        const value = event.target.value;
        setTransaction({...editTransaction, Amount: value});
    }

    return (
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Edit transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="inputContainer">
                        <label htmlFor="type" className = "inputLabel">Type:</label>
                        <Form.Select
                            id = "type"
                            className = "field"
                            value = {editTransaction.Type}
                            onChange = {transactionTypeChange}
                        >
                            <option>Refill</option>
                            <option>Withdrawal</option>
                        </Form.Select>
                    </div>
                    <div className = "inputContainer">
                        <label id = "clientLabel" htmlFor = "client" className = "inputLabel">Client name:</label>
                        <input
                            id = "client"
                            value = {editTransaction.ClientName}
                            onChange = {clientNameChange}
                        />
                    </div>
                    <div className="inputContainer">
                        <label id = "amountLabel" htmlFor = "amount" className = "inputLabel">Amount:</label>
                        <input
                            id = "amount"
                            value = {editTransaction.Amount}
                            onChange = {amountChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handleClose(editTransaction)}>
                Save changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditModal;