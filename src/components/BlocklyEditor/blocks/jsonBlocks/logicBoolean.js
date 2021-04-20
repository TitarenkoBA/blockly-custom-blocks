import i18n from "i18next";

const logicBoolean = {
  "type": "logic_boolean",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BOOL",
      "options": [
        [`${i18n.t("blockly.blocks.logicBoolean.options.first")}`, "TRUE"],
        [`${i18n.t("blockly.blocks.logicBoolean.options.second")}`, "FALSE"]
      ]
    }
  ],
  "output": "Boolean",
  "style": "logic_blocks",
}

export default logicBoolean;