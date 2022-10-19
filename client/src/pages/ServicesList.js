import { Container, Row, Col, Alert, Button, OverlayTrigger, Popover, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ServicesList(props) {

  const displayedServices = [];
  props.servList?.forEach(s => displayedServices.push(s));

  return (
    <Container>
      <Row>
        <Col>
          <h1>List of service</h1>
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
      <Row>
        {displayedServices.map((service) => <ServiceButton key={service.ServiceID} service={service} addNewTicket={props.addNewTicket}></ServiceButton>)}
      </Row>
    </Container>
  );
}

function ServiceButton(props) {
  return (
    <>
      <Col xs={4}>
        <OverlayTrigger trigger="click" rootClose placement="right"
          overlay={<Popover id="popover-basic">
            {<PopElement service={props.service} addNewTicket={props.addNewTicket}></PopElement>}</Popover>}>
          <Button className='mt-4' variant="warning" size="lg">{props.service.ServiceName}</Button>
        </OverlayTrigger>
      </Col>
    </>);
}

function PopElement(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    props.addNewTicket(props.service.ServiceID);

    navigate("/service/" + props.service.ServiceID);

  }

  return (
    <>
      <Popover.Header as="h3">Are you sure?</Popover.Header>
      <Popover.Body>
        Click on <strong>confirm</strong> if you are sure to select that service: {props.service.ServiceName}.
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