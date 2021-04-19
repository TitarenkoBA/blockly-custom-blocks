import React from 'react';
import Form from './Form';

const PopUpWindow = (props) => {
  
  return (
    <div className='popup__container' onClick={props.cancel}>
      <Form 
        variables={props.variables}
        context={props.context}
        warningText={props.warningText}
      />
    </div>
  )
}

export default PopUpWindow;