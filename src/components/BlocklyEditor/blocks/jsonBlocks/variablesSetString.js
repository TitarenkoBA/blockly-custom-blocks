import i18n from "i18next";

const variablesSetString = {
  "type": "variables_set_string",
  "message0": `${i18n.t("variables.set.message0.part1")} %1 ${i18n.t("variables.set.message0.part2")} %2`,
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "item",
      "variableTypes": ["String"],
      "defaultType": "String",
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "extensions": ["dynamic_tooltips_and_defaultValues"],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default variablesSetString;