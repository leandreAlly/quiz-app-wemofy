// ConfirmationPopup.jsx
import React from 'react';

const ConfirmationPopup = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Are you sure you want to submit the quiz?</h2>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
