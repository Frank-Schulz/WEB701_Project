import React from 'react'
import { Button } from 'react-bootstrap';

function Modal(modal) {

  const {
    header = "Header",
    message = "Default Message",
    confirm = "Yes",
    cancel = "No",
  } = modal;

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-around">
        <Button variant="primary">{confirm}</Button>
        <Button variant="secondary">{cancel}</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Modal
