import i18n from "i18next";

const logicTernary = {
  "type": "logic_ternary",
  "message0": `${i18n.t("blockly.blocks.logicTernary.message0")} %1`,
  "args0": [
    {
      "type": "input_value",
      "name": "IF",
      "check": "Boolean"
    }
  ],
  "message1": `${i18n.t("blockly.blocks.logicTernary.message1")} %1`,
  "args1": [
    {
      "type": "input_value",
      "name": "THEN"
    }
  ],
  "message2": `${i18n.t("blockly.blocks.logicTernary.message2")} %1`,
  "args2": [
    {
      "type": "input_value",
      "name": "ELSE"
    }
  ],
  "output": null,
  "style": "logic_blocks",
  "extensions": ["logic_ternary"]
}

export default logicTernary;