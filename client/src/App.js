import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServicesList } from './ServicesList';
import { Service } from './Service'
import { useState } from 'react';

function App() {

  const [servList, setServList] = useState([]);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<ServicesList servList={servList}/>} />
        <Route path='/service' element={<Service />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
