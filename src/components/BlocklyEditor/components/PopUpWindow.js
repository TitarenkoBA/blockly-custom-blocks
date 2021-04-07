import React from 'react';

const PopUpWindow = (props) => {
  return (
    <div className={`popup-container  ${props.isVisible}`}>
      <form className="popup-form">
        <h3>Create new variable</h3>
        <label htmlFor="name">Enter variable name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="type">Choose variable type</label>
        <select name="type" id="type" defaultValue="none">
          <option value="none" disabled>none</option>
          <option value="string">string</option>
          <option value="int">integer</option>
        </select>
        <label htmlFor="description">Enter variable description</label>
        <textarea name="description" id="description" cols="40" rows="3"></textarea>
        <div className="popup-warningContainer">
          <button onClick={props.clickButton}>Create</button>
          <button onClick={props.clickArea}>Cancel</button>
          <p className="popup-warningText" id="warningText"></p>
        </div>
      </form>
    </div>
  )
}

export default PopUpWindow;