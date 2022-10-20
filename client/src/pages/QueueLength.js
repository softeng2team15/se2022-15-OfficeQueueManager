import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/Progressbar';
import API from '../API';

import './QueueLength.css'
import { useParams } from 'react-router-dom';

let interval;
function QueueLength() {

  var [initVal, setInitVal] = useState(undefined);
  var [remainingTime, setRemainingTime] = useState('∞');

  var [currentVal, setCurrentVal] = useState(initVal);


  const {ticketId} = useParams();
  useEffect(() => {
    API.getServiceLength(ticketId).then(res => {
      setInitVal(res);
      setCurrentVal(res);
    });
    API.getRemainingTimeToServe(ticketId).then(res => {
      setRemainingTime(res);

    });

    if (!interval) {
      interval = setInterval(() => {

        API.getServiceLength(ticketId).then(res => {
          setCurrentVal(res);
        });
        API.getRemainingTimeToServe(ticketId).then(res => {
          setRemainingTime(res);

        });

      }, 5000);
    }

  }, [])

  return (

    <div className='counter-container'>
      <h1>Queue Length</h1>
      <div>{currentVal} <small>people are ahead of you</small></div>
      <h1>Waiting Time</h1>
      <div>~{Math.ceil(remainingTime)} <small>Minutes</small></div>
      <ProgressBar percentage={currentVal / initVal * 100}></ProgressBar>
    </div>
  );
}

export default QueueLength;
