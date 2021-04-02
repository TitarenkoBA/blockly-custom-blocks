import * as Blockly from 'blockly/core';
import sendMailField from './sendMailField';
import runTheScript from './runTheScript';
import createIncident from './createIncident';
import eventOccur from './eventOccur'; 
import variablesAddingForm from './variablesAddingForm'; 
import variablesGet from './variablesGet';
import variablesSet from './variablesSet';
import { validator, getValue, validateObj } from '../utils/utils'



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
    this.getField('INPUT').onMouseDown_ = () => this.createVar(this);
  },
  createVar: function (block) {
    const variable = {
      name: getValue(block, 'NAME'),
      type: getValue(block, 'TYPE'),
      description: getValue(block, 'DESCRIPTION'),
    }

    const code = validateObj(variable);
    if (code === "OK \n") {
      const toolbox = Blockly.mainWorkspace.toolbox_;
      const elem = { ...Blockly.mainWorkspace.toolbox_.getToolboxItemById('categoryId').flyoutItems_[1] }
      toolbox.contents_[1].flyoutItems_.push(elem);
    }
  }
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