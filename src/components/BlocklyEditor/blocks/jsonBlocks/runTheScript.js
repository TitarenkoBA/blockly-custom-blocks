const runTheScript = {
  "type": "run_script_field",
  "message0": "run script: %1",
  "args0": [
    {
      "type": "field_multilinetext",
      "name": "SCRIPT",
      "text": "Enter your script here",
      "check": "String",
      "spellcheck": false
    }
  ],
  "extensions": ["clearing_text_field"],
  "colour": 180,
  "previousStatement": null,
  "nextStatement": null,
}

export default runTheScript;