import i18n from "i18next";

const controlsRepeatExt = {
  "type": "controls_repeat_ext",
  "message0": `${i18n.t("blockly.blocks.controlsRepeatExt.message0.part1")} %1 ${i18n.t("blockly.blocks.controlsRepeatExt.message0.part2")}`,
  "args0": [{
    "type": "input_value",
    "name": "TIMES",
    "check": "Number"
  }],
  "message1": `${i18n.t("blockly.blocks.controlsRepeatExt.message1")} %1`,
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "style": "loop_blocks",
}

export default controlsRepeatExt;