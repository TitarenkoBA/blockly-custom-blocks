import i18n from "i18next";

const textCharAt = {
  "type": "text_charAt",
  "message0": `${i18n.t("blockly.blocks.textCharAt.message0.part1")} %1 ${i18n.t("blockly.blocks.textCharAt.message0.part2")} %2`,
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    },
    {
      "type": "field_dropdown",
      "name": "WHERE",
      "options": [
        [`${i18n.t("blockly.blocks.textCharAt.options.first")}`, "FROM_START"],
        [`${i18n.t("blockly.blocks.textCharAt.options.second")}`, "FROM_END"],
        [`${i18n.t("blockly.blocks.textCharAt.options.third")}`, "FIRST"],
        [`${i18n.t("blockly.blocks.textCharAt.options.fourth")}`, "LAST"],
        [`${i18n.t("blockly.blocks.textCharAt.options.fifth")}`, "RANDOM"]
      ]
    }
  ],
  "output": "String",
  "style": "text_blocks",
  "inputsInline": true,
  "mutator": "text_charAt_mutator"
}

export default textCharAt;