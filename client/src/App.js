import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import { ServicesList } from './ServicesList';
import { Service } from './Service';
import Header from './components/header';
import Login from './components/login';
import Officer from './components/officer';
function App() {
  const [logged,setLogged]=useState(false)
  return (
    <>
      <Header logged={logged} setLogged={setLogged}/>
      <Routes>
        <Route path='/' element={<ServicesList />} />
        <Route path='/service' element={<Service />} />
        <Route path='/login' element={<Login setLogged={setLogged}/>}/>
        <Route path='/officer/:username' element={<Officer setLogged={setLogged}/>}/>
      </Routes>
    </>
  );
}

export default App;
