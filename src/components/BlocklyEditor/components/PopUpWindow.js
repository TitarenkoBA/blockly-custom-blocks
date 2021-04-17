import React from 'react';
import Form from './Form/';

const PopUpWindow = (props) => {
  
  return (
    <div className='popup--container' onClick={props.cancel}>
      {/* <form className="popup--form">
        <h3>Create new variable</h3>
        <label htmlFor="name">Enter variable name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={props.values.name}
          onChange={props.handleInputChange}
        />
        <label htmlFor="type">Choose variable type</label>
        <select
          name="type"
          id="type"
          value={props.values.type}
          onChange={props.handleInputChange}
          >
          <option value="none" disabled>none</option>
          <option value="string">string</option>
          <option value="integer">integer</option>
        </select>
        <label htmlFor="defaultValue">Enter variable default value</label>
        <input
          type={props.values.type === "integer" ? "number" : "text"}
          name="defaultValue"
          id="defaultValue"
          value={props.values.defaultValue}
          onChange={props.handleInputChange}
        />
        <label htmlFor="description">Enter variable description</label>
        <textarea
          name="description"
          id="description"
          cols="40"
          rows="3"
          value={props.values.description}
          onChange={props.handleInputChange}
        ></textarea>
        <div className="popup--warningContainer">
          <button className="popup--button-create" onClick={props.clickButton}>Create</button>
          <button className="popup--button-cancel" onClick={props.clickArea}>Cancel</button>
          <p className="popup--warningText" id="warningText">{props.warningText}</p>
        </div>
      </form> */}
      <Form variables={props.variables} context={props.context} warningText={props.warningText} />
    </div>
  )
}

export default PopUpWindow;