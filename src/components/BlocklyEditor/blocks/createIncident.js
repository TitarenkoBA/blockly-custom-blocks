const createIncident = {
  "type": "create_incident_field",
  "message0": "Create an incident",
  "message1": "subject: %1",
  "args1": [
    {
      "type": "field_input",
      "name": "SUBJECT",
      "text": "Enter subject",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message2": "body: %1",
  "args2": [
    {
      "type": "field_multilinetext",
      "name": "BODY",
      "text": "Enter your message",
      "check": "String",
      "spellcheck": true
    }
  ],
  "message3": "priority: %1",
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
  "message4": "responsible: %1",
  "args4": [
    {
      "type": "field_input",
      "name": "RESP",
      "text": "example@mail.com",
      "check": "String",
      "spellcheck": false
    }
  ],
  "extensions": ["validator_for_email"],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null,
};

export default createIncident;