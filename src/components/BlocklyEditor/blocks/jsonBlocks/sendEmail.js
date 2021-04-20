import i18n from "i18next";

const sendEmail = {
  "type": "send_email",
  "message0": `${i18n.t("blockly.blocks.sendEmail.message0")}`,
  "message1": `${i18n.t("blockly.blocks.sendEmail.message1")} %1`,
  "args1": [
    {
      "type": "field_input",
      "name": "FROM",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "message2": `${i18n.t("blockly.blocks.sendEmail.message2")} %1`,
  "args2": [
    {
      "type": "field_input",
      "name": "TO",
      "text": "dambledore@hogwarts.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "message3": `${i18n.t("blockly.blocks.sendEmail.message3")} %1`,
  "args3": [
    {
      "type": "field_input",
      "name": "SUBJECT",
      "text": `${i18n.t("blockly.blocks.sendEmail.args3.text0")}`,
      "check": "String",
      "spellcheck": true
    }
  ],
  "message4": `${i18n.t("blockly.blocks.sendEmail.message4")} %1`,
  "args4": [
    {
      "type": "field_multilinetext",
      "name": "BODY",
      "text": `${i18n.t("blockly.blocks.sendEmail.args4.text0")}`,
      "check": "String",
      "spellcheck": true
    }
  ],
  "extensions": ["clearing_text_field"],
  "colour": 100,
  "previousStatement": null,
  "nextStatement": null,
};

export default sendEmail;