import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteAlert(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert text-danger displayed">
            Do you want to delete {props?.element?.name} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onMouseUp={props.handleClose}
            onClick={props.handleClose}
          >
            Discard
          </Button>
          <Button
            className="text-white"
            variant="dark"
            onClick={() => {
              props.delete(props?.element?.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAlert;
