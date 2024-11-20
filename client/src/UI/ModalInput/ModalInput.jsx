import React from 'react';
import './ModalInput.css';

const ModalInput = ({ placeholder }) => {
  return (
    <input
      type="text"
      className="modal-input"
      placeholder={placeholder}
    />
  );
};

export default ModalInput;
