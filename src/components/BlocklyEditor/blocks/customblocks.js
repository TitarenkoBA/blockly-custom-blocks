import * as Blockly from 'blockly/core';
import sendMailField from './sendMailField';
import runTheScript from './runTheScript';
import createIncident from './createIncident';
import eventOccur from './eventOccur';

Blockly.Blocks['send_mail_field'] = {
  init: function () {
    this.jsonInit(sendMailField);
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
  }
};

Blockly.Blocks['event_occur'] = {
  init: function () {
    this.jsonInit(eventOccur);
  }
};