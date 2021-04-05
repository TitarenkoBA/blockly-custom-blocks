import * as Blockly from 'blockly/core';
import { getValue, validateObj } from '../utils/utils'

export function createVar(block) {
  const variable = {
    name: getValue(block, 'NAME'),
    type: getValue(block, 'TYPE'),
    description: getValue(block, 'DESCRIPTION'),
  }

  const variableModel = validateObj(variable);

  if (variableModel === "OK \n") {
    block.setWarningText(null);

    const toolbox = Blockly.mainWorkspace.getToolbox();
    const newContnentsArray = [...toolbox.getToolboxItemById('categoryVars').getContents()]
      .map((item) => item.blockxml);

    const checkingName = newContnentsArray.find((item) => item.innerText.trim() === variable.name);

    if (!checkingName) {
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

      newContnentsArray.push(domNewVariable.domNewGetVariable, domNewVariable.domNewSetVariable,)
      toolbox.getToolboxItemById('categoryVars').updateFlyoutContents(newContnentsArray)

      block.appendDummyInput('INPUT').appendField(new Blockly.FieldLabel("OK"));
      setTimeout(() => block.removeInput('INPUT'), 1000);
    } else {
      block.setWarningText('Error: variable name already exists!');
    }

  } else {
    block.setWarningText(variableModel);
  }
}