import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import { ServicesList } from './pages/ServicesList';
import QueueLength from './pages/QueueLength'
import { useState, useEffect } from 'react';
import API from './API.js';
import Header from './components/header';
import Login from './components/login';
import Officer from './components/officer';
function App() {
  const [logged,setLogged]=useState(false)

  /*const vett = [{ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"},
  {ServiceID: 4, ServiceName: "prova4"}, {ServiceID: 4, ServiceName: "prova4"},
  {ServiceID: 1, ServiceName: "prova"}, {ServiceID: 2, ServiceName: "prova2"}, {ServiceID: 3, ServiceName: "prova3"}];*/
  const [ticket,setTicket]=useState(-1);
  const [servList, setServList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.getServiceList()
      .then((servList) => setServList(servList))
      .catch(err => setMessage(err));
    console.log(servList)
  }, [])

  async function addNewTicket(serviceID) {
    try {
      const tick=await API.newTicket(serviceID);
      setTicket(tick);
      return tick;
    } catch (error) {
      setTicket(-1);
      throw error;
    }
  }


  return (
    <>
      <Header logged={logged} setLogged={setLogged}/>
      <Routes>
        <Route path='/' element={<ServicesList servList={servList} addNewTicket={addNewTicket} />} />
        <Route path='/ticket/:ticketId' element={<QueueLength />} />
        <Route path='/login' element={<Login setLogged={setLogged}/>}/>
        <Route path='/officer/:username' element={<Officer setLogged={setLogged}/>}/>
      </Routes>
    </>
  );
}

export default App;
