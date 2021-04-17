import React, { Component } from 'react';
import { Field, reduxForm  } from 'redux-form';
import { createVariablesFunc } from '../../utils/utils';
import { SubmissionError } from 'redux-form'
import i18n from "i18next";

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
        <option value="">{i18n.t("popUp.options.none")}</option>
        <option value="integer">{i18n.t("popUp.options.integer")}</option>
        <option value="string">{i18n.t("popUp.options.string")}</option>
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
    const { handleSubmit, reset, context, cancel, submitting  } = this.props;
    const submit = (values) => {
      if (!values.name) {
        throw new SubmissionError({ name: 'Please, enter variable name!', _error: 'Creation of variable failed!' });
      }
      if (!values.type) {
        throw new SubmissionError({ type: 'The type of variable is not choosen!', _error: 'Creation of variable failed!' });
      }
      if (!values.defaultValue) {
        throw new SubmissionError({ defaultValue: 'Please, enter variable default value!', _error: 'Creation of variable failed!' });
      }
      if (values.type === "integer") {
        if (!Number.parseInt(values.defaultValue)) {
          throw new SubmissionError({ defaultValue: 'The value does not match the type of the variable!', _error: 'Creation of variable failed!' });
        }
      }
      const variables = [...this.props.variables];
      const checkingName = variables.find((item) => item.name === values.name);
      if (!checkingName) {
        this.setState({ warningText: ''});
        reset();
        return createVariablesFunc(variables, values, context)
      } else {
        this.setState({ warningText:  i18n.t("popUp.warningText") })
      }
    }
    
    return (
      <form className="popup--form" >
        <h3>{i18n.t("popUp.title")}</h3>
        <Field name="name" component={this.renderFieldInput} label={i18n.t("popUp.labels.name")} type="text" />
        <Field name="type" component={this.renderFieldSelect} label={i18n.t("popUp.labels.type")} />
        <Field name="defaultValue" component={this.renderFieldInput} label={i18n.t("popUp.labels.defaultValue")} type="text" />
        <Field name="description" component={this.renderFieldTextarea} label={i18n.t("popUp.labels.description")}/>
        <div className="popup--buttonContainer">
          <button
            className="popup--button-create"
            onClick={handleSubmit(submit)}
            type="submit"
            disabled={submitting}
          >{i18n.t("popUp.buttons.create")}</button>
          <button
            className="popup--button-cancel"
            onClick={() => {
              this.setState({ warningText: '' });
              reset();
              return cancel;
            }}
            type="button"
          >{i18n.t("popUp.buttons.cancel")}</button>
          <button
            className="popup--button-reset"
            onClick={() => {
              this.setState({ warningText: '' });
              reset()
            }}
            type="button"
          >{i18n.t("popUp.buttons.reset")}</button>
        </div>
        <p className="popup--warningText" id="warningText">{this.state.warningText}</p>
      </form>
    );
  }
}

Form = reduxForm({
  form: 'createVariableForm',
})(Form);

export default Form;