import React from 'react';
import './ModalInput.css';

const ModalInput = ({ 
  type = "text", 
  name,
  placeholder, 
  value, 
  onChange,
  required 
}) => {
  return (
    <input
      type={type}
      name={name}
      className="modal-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default ModalInput;
