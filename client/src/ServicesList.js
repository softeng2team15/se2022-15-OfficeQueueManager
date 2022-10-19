import { Container, Row, Col, Alert, Button, Stack, OverlayTrigger, Popover, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ServicesList(props) {

  const [service, setService] = useState("");

  return (
    <Container>
      <Row>
        <Col>
          <h1>List of services</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={5}>
        <Alert variant="primary">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                Please select one of the available services to get a ticket
            </p>
        </Alert>
        </Col>
      </Row>
      <Stack gap={3}>
      <Row>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("first")}}>Service 1</Button>
        </OverlayTrigger>
        </Col>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("second")}}>Service 2</Button>
        </OverlayTrigger>
        </Col>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("third")}}>Service 3</Button>
        </OverlayTrigger>
        </Col>
      </Row>
      <Row>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("fourth")}}>Service 4</Button>
        </OverlayTrigger>
        </Col>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("fifth")}}>Service 5</Button>
        </OverlayTrigger>
        </Col>
        <Col>
        <OverlayTrigger trigger="click" rootClose placement="right" 
        overlay={<Popover id="popover-basic">{<PopElement service={service}></PopElement>}</Popover>}>
            <Button variant="warning" size="lg" onClick={() => {setService("sixth")}}>Service 6</Button>
        </OverlayTrigger>
        </Col>
      </Row>
      </Stack>  
    </Container>
  );
}

function PopElement(props){
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    //function to call the API to add the new customer at the service queue

    navigate("/service");
  
  }

  return(
    <>
      <Popover.Header as="h3">Are you sure?</Popover.Header>
      <Popover.Body>
        Click on <strong>confirm</strong> if you are sure to select the {props.service} service. 
        <br></br>
        <br></br>
        <Form onSubmit={(handleSubmit)}>
        <Button variant="outline-success" type='submit'>Confirm</Button>
        </Form>
      </Popover.Body>
    </>
  );
}

export { ServicesList };