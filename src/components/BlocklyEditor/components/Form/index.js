import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm, /*formValueSelector*/  } from 'redux-form';
import { validate } from './formValidate'
import { createVariablesFunc } from '../../utils/utils';

class Form extends Component {
  state = {
    warningText: '',
  }
  renderFieldInput = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label><br/>
      <input {...input} type={type} />
      {touched && ((error && <div className="popup--warningText">{error}</div>))}
    </div>
  );
  renderFieldSelect = ({ label, meta: { touched, error } }) => (
    <div>
      <label>{label}</label><br />
      <Field name="type" component="select">
        <option value="">none</option>
        <option value="integer">integer</option>
        <option value="string">string</option>
      </Field>
      {touched && ((error && <div className="popup--warningText">{error}</div>))}
    </div>
  );
  renderFieldTextarea = ({ label, meta: { touched, error } }) => (
    <div>
      <label>{label}</label><br />
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="3"
      ></textarea>
      {touched && ((error && <div className="popup--warningText">{error}</div>))}
    </div>
  );
  
  render() {
    // по умолчанию handleSubmit принимает функцию обработчик
    // reset скидывает значения до значений, заданных во время инициализации
    // в данном случае до undefined, так как значение не задано
    const { handleSubmit, reset, context, cancel, submitting  } = this.props;
    const submit = (values) => {
      const variables = [...this.props.variables];
      const checkingName = variables.find((item) => item.name === values.name);
      if (!checkingName) {
        this.setState({ warningText: ''});
        reset();
        return createVariablesFunc(variables, values, context)
      } else {
        this.setState({ warningText: 'Warning: variable name already exists!'})
      }
    }
    
    return (
      <form className="popup--form" >
        {/* принимает имя поля, тип и остальные свойства, которые расмотрим позже*/}
        <h3>Create new variable</h3>
        {/* <label htmlFor="name">Enter variable name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.props.values.name}
          onChange={this.props.handleInputChange}
        />
        <label htmlFor="type">Choose variable type</label>
        <select
          name="type"
          id="type"
          value={this.props.values.type}
          onChange={this.props.handleInputChange}
        >
          <option value="none" disabled>none</option>
          <option value="string">string</option>
          <option value="integer">integer</option>
        </select>
        <label htmlFor="defaultValue">Enter variable default value</label>
        <input
          type={this.props.values.type === "integer" ? "number" : "text"}
          name="defaultValue"
          id="defaultValue"
          value={this.props.values.defaultValue}
          onChange={this.props.handleInputChange}
        />
        <label htmlFor="description">Enter variable description</label>
        <textarea
          name="description"
          id="description"
          cols="40"
          rows="3"
          value={this.props.values.description}
          onChange={this.props.handleInputChange}
        ></textarea> */}
        <Field name="name" component={this.renderFieldInput} label="Enter variable name" type="text" />
        <Field name="type" component={this.renderFieldSelect} label="Choose variable type" />
        <Field name="defaultValue" component={this.renderFieldInput} label="Enter variable default value" type="text" />
        <Field name="description" component={this.renderFieldTextarea} label="Enter variable description"/>
        <div className="popup--warningContainer">
          <button
            className="popup--button-create"
            onClick={handleSubmit(submit)}
            // onClick={handleSubmit(this.props.clickButton)}
            type="submit"
            disabled={submitting}
          >Create</button>
          <button
            className="popup--button-cancel"
            onClick={() => {
              this.setState({ warningText: '' });
              reset();
              return cancel;
            }}
            type="button"
          >Cancel</button>
          <button
            className="popup--button-reset"
            onClick={reset}
            type="button"
          >Reset</button>
        </div>
        <p className="popup--warningText" id="warningText">{this.state.warningText}</p>
      </form>
    );
  }
}

Form = reduxForm({
  form: 'createVariableForm',
  validate
})(Form);

// const selector = formValueSelector('createVariableForm')
// Form = connect(
//   state => {
//     const variables = ''
//     return {
//       variables
//     }
//   }
// )(Form)

export default Form;