import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure this matches your app's root element

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2 className="modal-title">Confirm Delete</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="btn btn-danger">Delete</button>
                    <button onClick={onRequestClose} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
