import React from 'react';
import './modal.scss';

const Modal = ({ visible, title, children, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel' }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          {onCancel && (
            <button className="modal-btn modal-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button className="modal-btn modal-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
