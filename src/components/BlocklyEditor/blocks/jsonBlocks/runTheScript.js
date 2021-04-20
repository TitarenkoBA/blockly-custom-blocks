import i18n from "i18next";

const runTheScript = {
  "type": "run_script_field",
  "message0": `${i18n.t("blockly.blocks.runTheScript.message0")} %1`,
  "args0": [
    {
      "type": "field_multilinetext",
      "name": "SCRIPT",
      "text": `${i18n.t("blockly.blocks.runTheScript.args0.text0")}`,
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