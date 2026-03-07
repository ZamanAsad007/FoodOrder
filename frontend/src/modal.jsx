import React from 'react'
import ReactDom from 'react-dom'

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-panel" role="dialog" aria-modal="true">
        <button type="button" className="btn btn-ghost modal-close" onClick={onClose}>
          X
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </>,
    document.getElementById('cart-root')
  )
}