import * as Blockly from 'blockly/core';
import sendMailField from './sendMailField';
import runTheScript from './runTheScript';
import createIncident from './createIncident';
import eventOccur from './eventOccur';
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