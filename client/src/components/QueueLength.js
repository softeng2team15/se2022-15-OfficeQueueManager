import React, { useEffect, useState } from 'react';

import './QueueLength.css'

function QueueLength() {
  var [initVal, setInitVal] = useState(10);
  // var [initVal, setInitVal] = useState(undefined);
  // var [remainingTime,setRemainingTime] = useState('∞'); 

  var [currentVal, setCurrentVal] = useState(initVal);


  const serviceId = 2;
  useEffect(() => {
    // fetch(`api/${serviceId}/queueLength`).then(res => {
    //   console.log(res);
    //   setInitVal(res.length);
    // });
  }, [])


  setTimeout(() => {


    // fetch(`api/${serviceId}/queueLength`).then(res => {
    //   console.log(res);
    //   setCurrentVal(res.length);
    // });



    setCurrentVal(--currentVal);
  }, 1000);

  return (

    <div className='counter-container'>
      <h1>Queue Length</h1>
      <div>20 <small>people are ahead of you</small></div>
      <h1>Waiting Time</h1>
      <div>~1:35</div>
      <div>
        <div className="meter">
          <span style={{ width: currentVal / initVal * 100 + '%' }}></span>
        </div>
      </div>
    </div>
  );
}

export default QueueLength;
