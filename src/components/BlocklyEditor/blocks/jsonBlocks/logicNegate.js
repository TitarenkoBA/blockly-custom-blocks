import i18n from "i18next";

const logicNegate = {
  "type": "logic_negate",
  "message0": `${i18n.t("blockly.blocks.logicNegate.message0")} %1`,
  "args0": [
    {
      "type": "input_value",
      "name": "BOOL",
      "check": "Boolean"
    }
  ],
  "output": "Boolean",
  "style": "logic_blocks",
}

export default logicNegate;