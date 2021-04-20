import i18n from "i18next";

const controlsIfElse = {
  "type": "controls_ifelse",
  "message0": `${i18n.t("blockly.blocks.controlsIfElse.message0")} %1`,
  "args0": [
    {
      "type": "input_value",
      "name": "IF0",
      "check": "Boolean"
    }
  ],
  "message1": `${i18n.t("blockly.blocks.controlsIfElse.message1")} %1`,
  "args1": [
    {
      "type": "input_statement",
      "name": "DO0"
    }
  ],
  "message2": `${i18n.t("blockly.blocks.controlsIfElse.message2")} %1`,
  "args2": [
    {
      "type": "input_statement",
      "name": "ELSE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "style": "logic_blocks",
  "extensions": ["controls_if_tooltip"]
  }

export default controlsIfElse;