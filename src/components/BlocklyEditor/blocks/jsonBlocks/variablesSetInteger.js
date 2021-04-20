import i18n from "i18next";

const variablesSetInteger = {
  "type": "variables_set_integer",
  "message0": `${i18n.t("blockly.variables.set.message0.part1")} %1 ${i18n.t("blockly.variables.set.message0.part2")} %2`,
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "item",
      "variableTypes": ["Number"],
      "defaultType": "Number",
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "Number"
    }
  ],
  "extensions": ["dynamic_tooltips_and_defaultValues"],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default variablesSetInteger;