import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import { createVariablesFunc } from '../utils/utils';
import i18n from "i18next";

class Form extends Component {
  state = {
    warningText: '',
  }
  renderFieldInput = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label><br/>
      <input {...input} type={type} />
      {touched && ((error && <div className="popup__warningText">{error}</div>))}
    </div>
  );
  renderFieldSelect = ({ label, meta: { touched, error } }) => (
    <div>
      <label>{label}</label><br />
      <Field name="type" component="select">
        <option value="">{i18n.t("blockly.popUp.options.none")}</option>
        <option value="integer">{i18n.t("blockly.popUp.options.integer")}</option>
        <option value="string">{i18n.t("blockly.popUp.options.string")}</option>
      </Field>
      {touched && ((error && <div className="popup__warningText">{error}</div>))}
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
      {touched && ((error && <div className="popup__warningText">{error}</div>))}
    </div>
  );

  resetFieldsValuesAndWarningText = () => {
    this.setState({ warningText: '' });
    this.props.reset();
  }
  
  render() {
    const { handleSubmit, context, submitting  } = this.props;
    const submit = (values) => {
      if (!values.name) {
        throw new SubmissionError({ name: i18n.t("blockly.popUp.errors.name"), _error: 'Creation of variable failed!' });
      }
      if (!values.type) {
        throw new SubmissionError({ type: i18n.t("blockly.popUp.errors.type"), _error: 'Creation of variable failed!' });
      }
      if (!values.defaultValue) {
        throw new SubmissionError({ defaultValue: i18n.t("blockly.popUp.errors.defaultValue"), _error: 'Creation of variable failed!' });
      }
      if (values.type === "integer") {
        if (!Number.parseInt(values.defaultValue)) {
          throw new SubmissionError({ defaultValue: i18n.t("blockly.popUp.errors.type-value"), _error: 'Creation of variable failed!' });
        }
      }
      const variables = [...this.props.variables];
      const checkingName = variables.find((item) => item.name === values.name);
      if (!checkingName) {
        this.resetFieldsValuesAndWarningText();
        return createVariablesFunc(variables, values, context)
      } else {
        this.setState({ warningText: i18n.t("blockly.popUp.warningText") })
      }
    }
    
    return (
      <form className="popup__form" >
        <h3>{i18n.t("blockly.popUp.title")}</h3>
        <Field name="name" component={this.renderFieldInput} label={i18n.t("blockly.popUp.labels.name")} type="text" />
        <Field name="type" component={this.renderFieldSelect} label={i18n.t("blockly.popUp.labels.type")} />
        <Field name="defaultValue" component={this.renderFieldInput} label={i18n.t("blockly.popUp.labels.defaultValue")} type="text" />
        <Field name="description" component={this.renderFieldTextarea} label={i18n.t("blockly.popUp.labels.description")}/>
        <div className="buttons-container">
          <button
            className="button popup__button-create"
            onClick={handleSubmit(submit)}
            type="submit"
            disabled={submitting}
          >{i18n.t("blockly.popUp.buttons.create")}</button>
          <button
            className="button popup__button-cancel"
            onClick={this.resetFieldsValuesAndWarningText}
            type="button"
          >{i18n.t("blockly.popUp.buttons.cancel")}</button>
          <button
            className="button popup__button-reset"
            onClick={this.resetFieldsValuesAndWarningText}
            type="button"
          >{i18n.t("blockly.popUp.buttons.reset")}</button>
        </div>
        <p className="popup__warningText" id="warningText">{this.state.warningText}</p>
      </form>
    );
  }
}

Form = reduxForm({
  form: 'createVariableForm',
})(Form);

export default Form;