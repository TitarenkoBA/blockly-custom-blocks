import Blockly from 'blockly/core';
import i18n from "i18next";

export function getValue(block, field) {
  return block.getFieldValue(field).trim() || null;
};

export function validateEmail(email) {
  // eslint-disable-next-line
  const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  return reg.test(email) ? email : null;
};

export function validateObj(obj) {
  let err = "";
  let count = 0;
  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key] !== "NONE") {
      count++;
    } else {
      err += "Error: wrong " + key + "! \n";
    }
  });
  return count === Object.keys(obj).length ? "OK \n" : err;
};

export function validator(newValue) {
  const input = this.sourceBlock_.getInput(`INPUT_${this.name}`) || null;
  
  if (!validateEmail(newValue)) {
    if (input) {
      this.sourceBlock_.removeInput(`INPUT_${this.name}`)
    }

    this.sourceBlock_
      .appendDummyInput(`INPUT_${this.name}`)
      .appendField(new Blockly.FieldLabel(`------${i18n.t("blockly.blocks.errors.email")}!------`))

    const arr = this.sourceBlock_.inputList.map((elem) => elem.fieldRow[1] || elem);
    arr.splice(0, 1);

    const newArr = arr.map(elem => elem.name);
    const index = newArr.indexOf(this.name) + 2;
    const indexInput = newArr.indexOf(`INPUT_${this.name}`) + 1;

    if (indexInput !== index) {
      this.sourceBlock_.moveNumberedInputBefore(indexInput, index)
    }

  } else {
    if (input) {
      this.sourceBlock_.removeInput(`INPUT_${this.name}`)
    }
  }
  return newValue;
}

export function createGetterSetter(item, variable) {
  const xmlField = Blockly.utils.xml.createElement('field');
  xmlField.setAttribute('name', 'VAR');
  xmlField.setAttribute('variabletype', variable.type === "string" ? "String" : "Number");
  xmlField.appendChild(Blockly.utils.xml.createTextNode(variable.name));
  const xmlBlock = Blockly.utils.xml.createElement('block');
  xmlBlock.setAttribute('type', `variables_${item}_${variable.type}`);
  xmlBlock.appendChild(xmlField);
  return xmlBlock;
}

export function createVariablesFunc(varsArr, newVar, context) {
  let variable = newVar;
  let variablesInState = [...varsArr];
  
  const toolbox = Blockly.mainWorkspace.getToolbox();

  let newContnentsArray = [...toolbox.getToolboxItemById('categoryVars').getContents()]
    .map((item) => item.blockxml);
  newContnentsArray = newContnentsArray.slice(1);

  let button = `<button callbackKey="createVariable" className="button" text="${i18n.t("blockly.toolbox.buttons.createVariable")}" />`
  button = Blockly.Xml.textToDom(button);

        const newVariable = {
          newGetVariable: createGetterSetter('get', variable),
          newSetVariable: createGetterSetter('set', variable)
        }

        newContnentsArray.push(newVariable.newGetVariable, newVariable.newSetVariable);
        variablesInState.push(variable);

        context.setState({
          isVisible: false,
          variables: [...variablesInState]
        });
  
  Blockly.Extensions.unregister("dynamic_tooltips_and_defaultValues");
  context.registerDynamicTooltipsAndDefaultValues(variablesInState);

  newContnentsArray.unshift(button);
  toolbox.getToolboxItemById('categoryVars').updateFlyoutContents(newContnentsArray)
  toolbox.refreshSelection()
}
