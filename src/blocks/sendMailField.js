const sendMailField = {
  "type": "send_mail_field",
  "message0": "send mail from %1 to %2",
  "args0": [
    {
      "type": "field_input",
      "name": "FROM",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    },
    {
      "type": "field_input",
      "name": "TO",
      "text": "dambledore@hogwarts.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "message1": "theme: %1",
  "args1": [
    {
      "type": "field_input",
      "name": "THEME",
      "text": "Enter theme",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message2": "message: %1",
  "args2": [
    {
      "type": "field_multilinetext",
      "name": "MESSAGE",
      "text": "Enter your message",
      "check": "String",
      "spellcheck": true
    }
  ],
  "colour": 100,
  "previousStatement": null,
  "nextStatement": null,
};

export default sendMailField;