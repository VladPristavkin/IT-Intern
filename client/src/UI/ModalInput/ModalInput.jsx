import React from 'react';
import './ModalInput.css';

const ModalInput = ({ type = "text", placeholder }) => {
  return (
    <input
      type={type}
      className="modal-input"
      placeholder={placeholder}
    />
  );
};

export default ModalInput;
