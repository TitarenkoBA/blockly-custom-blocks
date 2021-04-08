const variablesSetInteger = {
  "type": "variables_set_integer",
  "message0": "set %1 to %2",
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
  "extensions": ["dynamic_tooltips"],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default variablesSetInteger;