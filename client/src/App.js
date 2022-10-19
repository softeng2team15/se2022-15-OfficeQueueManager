import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServicesList } from './ServicesList';
import  QueueLength  from './components/QueueLength'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<ServicesList />} />
        <Route path='/service' element={<QueueLength />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
