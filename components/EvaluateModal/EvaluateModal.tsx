import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ExperimentModalProps {
  handleReject: () => void;
  handleAdopt: () => void;
  experimentName: string;
  experimentSuccess: string;
}

export const EvaluateModal: React.FC<ExperimentModalProps> = ({
  handleReject,
  handleAdopt,
  experimentName,
  experimentSuccess,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onReject = () => {
    handleReject();
    handleClose();
  };

  const onAdopt = () => {
    handleAdopt();
    handleClose();
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Evaluate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Experiment Summary"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Experiment name:`} <br />
          {experimentName} <br />
          <br />
          {`Success is:`} <br />
          {experimentSuccess} <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onReject}>
            Reject
          </Button>
          <Button variant="success" onClick={onAdopt}>
            Adopt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
