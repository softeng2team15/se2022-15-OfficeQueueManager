import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServicesList } from './pages/ServicesList';
import { Service } from './pages/Service'
import { useState } from 'react';

function App() {

  const vett = [{ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"},
  {ServiceID: 4, ServiceName: "prova4"}, {ServiceID: 4, ServiceName: "prova4"},
  {ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"}];

  const [servList, setServList] = useState(vett);

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
