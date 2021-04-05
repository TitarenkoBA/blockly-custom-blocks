const variablesAddingForm = {
  "type": "variables_adding_form",
  "message0": "Here you can add your variables",
  "message1": "Enter variable name: %1",
  "args1": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "var1",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message2": "Enter variable type: %1",
  "args2": [
    {
      "type": "field_input",
      "name": "TYPE",
      "text": "string",
      "check": "String",
      "spellcheck": true,
    }
  ],
  "message3": "Enter variable description: %1",
  "args3": [
    {
      "type": "field_multilinetext",
      "name": "DESCRIPTION",
      "text": "...",
      "check": "String",
      "spellcheck": true,
    }
  ],
  "message4": "%1",
  "args4": [
    {
      "type": "field_input",
      "name": "INPUT",
      "text": "Click here to create variable",
    }
  ],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default variablesAddingForm;