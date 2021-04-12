const variablesGetInteger = {
  "type": "variables_get_integer",
  "message0": "%1",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "item",
      "variableTypes": ["Number"],
      "defaultType": "Number",
    }
  ],
  "extensions": ["dynamic_tooltips_and_defaultValues"],
  "output": "Number",
};

export default variablesGetInteger;