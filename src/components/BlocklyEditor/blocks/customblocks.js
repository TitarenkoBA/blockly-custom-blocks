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
    this.getField('INPUT').EDITABLE = false;
    this.getField('INPUT').onMouseDown_ = (e) => {
      e.preventDefault();
      this.createVar(this);
    }
  },
  createVar: function (block) {
    const variable = {
      name: getValue(block, 'NAME'),
      type: getValue(block, 'TYPE'),
      description: getValue(block, 'DESCRIPTION'),
    }

    const code = validateObj(variable);
    
    if (code === "OK \n") {
      this.setWarningText(null)
      
      const toolbox = Blockly.mainWorkspace.toolbox_;
      // const item = new Blockly.ToolboxItem({ ...variable }, toolbox, toolbox.getToolboxItemById('categoryId'));
      // toolbox.addToolboxItem_(item);
      // const elem = { ...Blockly.mainWorkspace.toolbox_.getToolboxItemById('categoryVars').flyoutItems_[1] }
      // toolbox.contents_[1].flyoutItems_.push(item);
      // Blockly.mainWorkspace.toolbox_.getToolboxItemById('categoryVars')
      // parseContents_(categoryDef)
      // toolbox.getToolboxItemById('categoryVars').updateFlyoutContents()
      // flyoutItems_
      // Blockly.getMainWorkspace()
      
      const arr = [...toolbox.getToolboxItemById('categoryVars').getContents()];
      // const itemGet = {...arr[1]};
      // itemGet.blockxml.innerText = variable.name;
      // itemGet.blockxml.innerHTML = `<field name="VAR" variabletype="${variable.type}" is="blockly">${variable.name}</field>`
      // itemGet.blockxml.outerText = variable.name;
      // itemGet.blockxml.innerHTML = `<block type="variables_get_custom" is="blockly"><field name="VAR" variabletype="${variable.type}" is="blockly">${variable.name}</field></block>`
      // const domElem = elem.blockxml;
      // const domToText = Blockly.Xml.domToText(domElem);
      // const newDomElem = Blockly.Xml.textToDom(domToText)

      const newVariable = {
        newGetVariable: `<block 
        xmlns="http://www.w3.org/1999/xhtml" 
        type="variables_get_custom" 
        is="blockly">
          <field 
            name="VAR"
            variabletype="${variable.type}"
            is="blockly"
          >${variable.name}</field>
        </block>`,
        newSetVariable: `<block 
        xmlns="http://www.w3.org/1999/xhtml" 
        type="variables_set_custom" 
        is="blockly">
          <field 
            name="VAR"
            variabletype="${variable.type}"
            is="blockly"
          >${variable.name}</field>
        </block>`
      }
      
      const domNewVariable = {
        domNewGetVariable: Blockly.Xml.textToDom(newVariable.newGetVariable),
        domNewSetVariable: Blockly.Xml.textToDom(newVariable.newSetVariable),
      }

      const newArray = arr.map((item) => item.blockxml);

      newArray.push(domNewVariable.domNewGetVariable, domNewVariable.domNewSetVariable,)
      
      toolbox.getToolboxItemById('categoryVars').updateFlyoutContents(newArray)

    } else {
      this.setWarningText('Error: empty field!');
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