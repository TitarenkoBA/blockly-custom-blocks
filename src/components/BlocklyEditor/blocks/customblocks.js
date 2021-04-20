import * as Blockly from 'blockly/core';
import sendEmail from './jsonBlocks/sendEmail';
import runTheScript from './jsonBlocks/runTheScript';
import createIncident from './jsonBlocks/createIncident';
import eventOccur from './jsonBlocks/eventOccur'; 
import variablesGetString from './jsonBlocks/variablesGetString';
import variablesSetString from './jsonBlocks/variablesSetString';
import variablesGetInteger from './jsonBlocks/variablesGetInteger';
import variablesSetInteger from './jsonBlocks/variablesSetInteger';
import textCharAt from './jsonBlocks/textCharAt';
import logicTernary from './jsonBlocks/logicTernary';
import logicOperation from './jsonBlocks/logicOperation';
import logicNull from './jsonBlocks/logicNull';
import logicNegate from './jsonBlocks/logicNegate';
import logicBoolean from './jsonBlocks/logicBoolean';
import controlsRepeatExt from './jsonBlocks/controlsRepeatExt';
import controlsIfElse from './jsonBlocks/controlsIfElse';
import { validator } from '../utils/utils'

Blockly.Blocks['send_email'] = {
  init: function () {
    this.jsonInit(sendEmail);
    const body = this.getField("BODY");
    body.maxDisplayLength = "30";
    body.maxLines_ = "5";
    this.getField("FROM").setValidator(validator.bind(this.getField("FROM")));
    this.getField("TO").setValidator(validator.bind(this.getField("TO")));
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
    this.getField("RESP").setValidator(validator.bind(this.getField("RESP")));
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

Blockly.Blocks['controls_ifelse'] = {
  init: function () {
    this.jsonInit(controlsIfElse);
  }
};

Blockly.Blocks['controls_repeat_ext'] = {
  init: function () {
    this.jsonInit(controlsRepeatExt);
  }
};

Blockly.Blocks['logic_boolean'] = {
  init: function () {
    this.jsonInit(logicBoolean);
  }
};

Blockly.Blocks['logic_negate'] = {
  init: function () {
    this.jsonInit(logicNegate);
  }
};

Blockly.Blocks['logic_null'] = {
  init: function () {
    this.jsonInit(logicNull);
  }
};

Blockly.Blocks['logic_operation'] = {
  init: function () {
    this.jsonInit(logicOperation);
  }
};

Blockly.Blocks['logic_ternary'] = {
  init: function () {
    this.jsonInit(logicTernary);
  }
};

Blockly.Blocks['text_charAt'] = {
  init: function () {
    this.jsonInit(textCharAt);
  }
};