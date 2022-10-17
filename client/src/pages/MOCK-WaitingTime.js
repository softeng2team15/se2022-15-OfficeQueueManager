import { useState } from 'react';
import { Card, Button, Modal } from "react-bootstrap";

function WaitingTime() {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show);

  return (<>
    <h1>Sample page</h1>
    <Card body>
        <p>Sample text here</p>
        <Button onClick={handleModal}>Expected waiting time</Button>
    </Card>

    <Modal centered show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Expected waiting time</Modal.Title>
      </Modal.Header>
      <Modal.Body>You have to wait XX minutes</Modal.Body>
    </Modal>
  </>);
}

export default WaitingTime;