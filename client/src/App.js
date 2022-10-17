import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WaitingTime } from "./pages/";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <WaitingTime/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
