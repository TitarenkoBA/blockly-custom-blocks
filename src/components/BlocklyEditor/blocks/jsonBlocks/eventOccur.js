import i18n from "i18next";

const eventOccur = {
  "type": "event_occur",
  "message0": `${i18n.t("blocks.eventOccur.message0")}`,
  "message1": `${i18n.t("blocks.eventOccur.message1")} %1`,
  "args1": [
    {
      "type": "input_statement",
      "name": "INPUT",
    }
  ],
  "extensions": ["dynamic_menu_extension", "clearing_text_field"],
  "colour": 10,
  "previousStatement": null,
  "nextStatement": null,
};

export default eventOccur;