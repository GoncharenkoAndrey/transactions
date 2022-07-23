import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Delete transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>Delete transaction? </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handleClose(true)}>
                Yes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;