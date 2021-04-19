import i18n from "i18next";

const createIncident = {
  "type": "create_incident_field",
  "message0": `${i18n.t("blocks.createIncident.message0")}`,
  "message1": `${i18n.t("blocks.createIncident.message1")} %1`,
  "args1": [
    {
      "type": "field_input",
      "name": "SUBJECT",
      "text": `${i18n.t("blocks.createIncident.args1.text0")}`,
      "check": "String",
      "spellcheck": true
    }
  ],
  "message2": `${i18n.t("blocks.createIncident.message2")} %1`,
  "args2": [
    {
      "type": "field_multilinetext",
      "name": "BODY",
      "text": `${i18n.t("blocks.createIncident.args2.text0")}`,
      "check": "String",
      "spellcheck": true,
    }
  ],
  "message3": `${i18n.t("blocks.createIncident.message3")} %1`,
  "args3": [
    {
      "type": "field_dropdown",
      "name": "PRIORITY",
      "options": [
        ["none", "NONE"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
      ]
    }
  ],
  "message4": `${i18n.t("blocks.createIncident.message4")} %1`,
  "args4": [
    {
      "type": "field_input",
      "name": "RESP",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "extensions": ["clearing_text_field"],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default createIncident;