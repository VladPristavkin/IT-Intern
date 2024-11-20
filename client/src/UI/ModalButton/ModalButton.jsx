import React from 'react';
import './ModalButton.css';

const ModalButton = ({ type = 'button', onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className="modal-button">
      {children}
    </button>
  );
};

export default ModalButton;

