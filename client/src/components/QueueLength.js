import React, { useEffect, useState } from 'react';

import './QueueLength.css'

function QueueLength() {
  const baseUrl = "http://localhost:3001";

  var [initVal, setInitVal] = useState(undefined);
  var [remainingTime, setRemainingTime] = useState('∞');

  var [currentVal, setCurrentVal] = useState(initVal);


  const serviceId = 1;
  useEffect(() => {
    fetch(baseUrl + `/api/tickets/${serviceId}/queueLength`).then(res => {
      setInitVal(res.length);
    });
  }, [])


  setTimeout(() => {

    fetch(baseUrl + `/api/tickets/${serviceId}/queueLength`).then(res => {
      setCurrentVal(res.length);
    });

    fetch(baseUrl + `/api/services/${serviceId}/serviceTime`).then(res => {
      setRemainingTime(res.length);
    });

    setCurrentVal(--currentVal);
  }, 5000);

  return (

    <div className='counter-container'>
      <h1>Queue Length</h1>
      <div>{currentVal} <small>people are ahead of you</small></div>
      <h1>Waiting Time</h1>
      <div>~{remainingTime} <small>Minutes</small></div>
      <div>
        <div className="meter">
          <span style={{ width: currentVal / initVal * 100 + '%' }}></span>
        </div>
      </div>
    </div>
  );
}

export default QueueLength;
