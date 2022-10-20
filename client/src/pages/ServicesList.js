import { Container, Row, Col, Card, Alert, Button, OverlayTrigger, Popover, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ServiceList.css';

function ServicesList(props) {

  const displayedServices = [];
  props.servList?.forEach(s => displayedServices.push(s));

  return (
    <Container>
      <Row>
        <Col>
          <h1>List of services</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="primary">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Please select one of the available services to get a ticket
            </p>
          </Alert>
        </Col>
      </Row>
      <Row>
        {displayedServices.map((service) => <ServiceCard key={service.ServiceID} service={service} addNewTicket={props.addNewTicket}/>)}
      </Row>
    </Container>
  );
}

function ServiceCard(props) {
  return(<>
    <Col xs={3}>
      <Card>
        <Card.Body>
          <Card.Title>{props.service.ServiceName}</Card.Title>
          <ServiceButton service={props.service} addNewTicket={props.addNewTicket}/>
        </Card.Body>
      </Card>
    </Col>
  </>);
}

function ServiceButton(props) {
  return (
    <>
      <OverlayTrigger trigger="click" rootClose placement="right"
        overlay={<Popover id="popover-basic">
          {<PopElement service={props.service} addNewTicket={props.addNewTicket}></PopElement>}</Popover>}>
        <Button className='mt-4 right' variant="warning" size="lg">Select</Button>
      </OverlayTrigger>
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