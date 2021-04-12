import * as Blockly from 'blockly/core';
import sendMailField from './jsonBlocks/sendMailField';
import runTheScript from './jsonBlocks/runTheScript';
import createIncident from './jsonBlocks/createIncident';
import eventOccur from './jsonBlocks/eventOccur'; 
import variablesGetString from './jsonBlocks/variablesGetString';
import variablesSetString from './jsonBlocks/variablesSetString';
import variablesGetInteger from './jsonBlocks/variablesGetInteger';
import variablesSetInteger from './jsonBlocks/variablesSetInteger';
import { validator } from '../utils/utils'

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

Blockly.Blocks['variables_get_string'] = {
  init: function () {
    this.jsonInit(variablesGetString);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
    this.setColour("#4ab55c");
  },
};

Blockly.Blocks['variables_set_string'] = {
  init: function () {
    this.jsonInit(variablesSetString);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
    this.setColour("#4ab55c");
  }
};

Blockly.Blocks['variables_get_integer'] = {
  init: function () {
    this.jsonInit(variablesGetInteger);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
    this.setColour("#4c80ba");
  }
};

Blockly.Blocks['variables_set_integer'] = {
  init: function () {
    this.jsonInit(variablesSetInteger);
    this.getField('VAR').onMouseDown_ = (e) => e.preventDefault();
    this.getField('VAR').EDITABLE = false;
    this.setColour("#4c80ba");
  }
};