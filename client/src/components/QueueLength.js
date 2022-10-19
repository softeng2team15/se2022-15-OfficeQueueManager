import React, { useEffect, useState } from 'react';
import API from '../API';

import './QueueLength.css'

let interval;
function QueueLength() {

  var [initVal, setInitVal] = useState(undefined);
  var [remainingTime, setRemainingTime] = useState('∞');

  var [currentVal, setCurrentVal] = useState(initVal);


  const serviceId = 1;
  useEffect(() => {
    API.getServiceLength(serviceId).then(res => {
      setInitVal(res);
      setCurrentVal(res);
    });
    API.getRemainingTimeToServe(serviceId).then(res => {
      setRemainingTime(res);

    });

    if (!interval) {
      interval = setInterval(() => {

        API.getServiceLength(serviceId).then(res => {
          setCurrentVal(res);
        });
        API.getRemainingTimeToServe(serviceId).then(res => {
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
