import React, { useState } from 'react';
function Form(props) {
  const [val, setVal] = useState('');
  const [target, setTarget] = useState('');
  const [scale, setScale] = useState('');

  const changeValue = (event) => {
    setVal(event.target.value)
  }

  const changeTarget = (event) => {
    setTarget(event.target.value)
  }
  
  const changeScale = (event) => {
    setScale(event.target.value)
  }

  const updateValue = (event) => {
    event.preventDefault();
    const pload = {
      val,
      target,
      scale,
    };
    props.func(pload);
    clearState();
  }

  const clearState = () => {
    setVal('');
    setTarget('');
    setScale('');
  };
  
  return (
        <div>
          <label>Value</label>
          <input type="text" value={val} onChange={changeValue} />
          <label>Target</label>
          <input type="text" value={target} onChange={changeTarget} />
          <label>Scale</label>
          <input type="text" value={scale} onChange={changeScale} />
          <button onClick={updateValue}> Click Me</button>
        </div>
      );
}

export default Form;