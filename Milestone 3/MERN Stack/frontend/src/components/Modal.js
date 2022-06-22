import React from 'react'
import { Button } from 'react-bootstrap';

/**
 * @param {{header: string, message: string, confirm: string, cancel: string}} modal
 * @returns A modal instance with the given parameters
 */
function Modal(modal) {

  const {
    header = "Header",
    message = "Default Message",
    confirm = "Yes",
    cancel = "No",
  } = modal;

  const response = (output) => {
    return output;
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-around">
        <Button variant="primary" onClick={response(true)}>{confirm}</Button>
        <Button variant="secondary" onClick={response(false)}>{cancel}</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Modal
