import React from 'react';
import './ModalInput.css';

const ModalInput = ({ type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="input-container">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`modal-input ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ModalInput;
