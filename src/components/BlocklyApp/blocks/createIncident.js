const createIncident = {
  "type": "create_incident_field",
  "message0": "subject: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "SUBJECT",
      "text": "Enter subject",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message1": "body: %1",
  "args1": [
    {
      "type": "field_multilinetext",
      "name": "BODY",
      "text": "Enter your message",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message2": "priority: %1",
  "args2": [
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
  "message3": "responsible: %1",
  "args3": [
    {
      "type": "field_input",
      "name": "RESP",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default createIncident;