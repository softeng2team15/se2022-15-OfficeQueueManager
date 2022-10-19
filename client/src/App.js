import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServicesList } from './pages/ServicesList';
import { Service } from './pages/Service'
import { useState, useEffect } from 'react';
import API from './API.js';


function App() {

  /*const vett = [{ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"},
  {ServiceID: 4, ServiceName: "prova4"}, {ServiceID: 4, ServiceName: "prova4"},
  {ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"}];*/

  const [servList, setServList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.getServiceList()
      .then( (servList) => setServList(servList) )
      .catch(err => setMessage(err))
  }, [])

  function addNewTicket(serviceID) {
    API.newTicket(serviceID)
      .then()
      .catch(err => setMessage(err))
  }


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<ServicesList servList={servList} addNewTicket={addNewTicket}/>} />
        <Route path='/service' element={<Service />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
