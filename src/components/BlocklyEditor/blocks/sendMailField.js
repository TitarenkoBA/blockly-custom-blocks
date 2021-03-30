const sendMailField = {
  "type": "send_mail_field",
  "message0": "Send an email",
  "message1": "from %1",
  "args1": [
    {
      "type": "field_input",
      "name": "FROM",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "message2": "to %1",
  "args2": [
    {
      "type": "field_input",
      "name": "TO",
      "text": "dambledore@hogwarts.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "message3": "subject: %1",
  "args3": [
    {
      "type": "field_input",
      "name": "SUBJECT",
      "text": "Enter subject",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message4": "body: %1",
  "args4": [
    {
      "type": "field_multilinetext",
      "name": "BODY",
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