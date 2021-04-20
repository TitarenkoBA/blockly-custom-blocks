import i18n from "i18next";

const logicOperation = {
  "type": "logic_operation",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Boolean"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        [`${i18n.t("blockly.blocks.logicOperation.options.first")}`, "AND"],
        [`${i18n.t("blockly.blocks.logicOperation.options.second")}`, "OR"]
      ]
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "style": "logic_blocks",
  "extensions": ["logic_op_tooltip"]
}

export default logicOperation;