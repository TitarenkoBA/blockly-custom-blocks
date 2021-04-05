import * as Blockly from 'blockly/core';
import sendMailField from './jsonBlocks/sendMailField';
import runTheScript from './jsonBlocks/runTheScript';
import createIncident from './jsonBlocks/createIncident';
import eventOccur from './jsonBlocks/eventOccur'; 
import variablesAddingForm from './jsonBlocks/variablesAddingForm'; 
import variablesGet from './jsonBlocks/variablesGet';
import variablesSet from './jsonBlocks/variablesSet';
import { validator } from '../utils/utils'
import { createVar } from './functions'

Blockly.Blocks['send_mail_field'] = {
  init: function () {
    this.jsonInit(sendMailField);
    const body = this.getField("BODY");
    body.maxDisplayLength = "30";
    body.maxLines_ = "5";
    const from = this.getField("FROM");
    from.setValidator(validator.bind(this));
    const to = this.getField("TO");
    to.setValidator(validator.bind(this));
  }
};

Blockly.Blocks['run_script_field'] = {
  init: function () {
    this.jsonInit(runTheScript);
  }
};

Blockly.Blocks['create_incident_field'] = {
  init: function () {
    this.jsonInit(createIncident);
    const body = this.getField("BODY");
    body.maxDisplayLength = "30";
    body.maxLines_ = "5";
    this.getField("RESP").setValidator(validator.bind(this));
  }
};

Blockly.Blocks['event_occur'] = {
  init: function () {
    this.jsonInit(eventOccur);
  }
};

Blockly.Blocks['variables_adding_form'] = {
  init: function () {
    this.jsonInit(variablesAddingForm);
    this.getField('INPUT_BUTTON').EDITABLE = false;
    this.getField('INPUT_BUTTON').onMouseDown_ = (e) => {
      e.preventDefault();
      createVar(this);
    }
  },  
};

Blockly.Blocks['variables_get_custom'] = {
  init: function () {
    this.jsonInit(variablesGet);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
  }
};

Blockly.Blocks['variables_set_custom'] = {
  init: function () {
    this.jsonInit(variablesSet);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
  }
};