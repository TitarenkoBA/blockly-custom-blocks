import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { getValue, validateObj } from '../utils/utils'

Blockly.JavaScript['send_mail_field'] = function (block) {
    const emailObject = {
        emailFrom: getValue(block, 'FROM'),
        emailTo: getValue(block, 'TO'),
        subject: getValue(block, 'SUBJECT'),
        message: getValue(block, 'BODY')
    };

    const code = validateObj(emailObject);

    if (code === "OK") {
        // eslint-disable-next-line
        const emailJson = JSON.stringify(emailObject);
    }

    return code;
};

Blockly.JavaScript['run_script_field'] = function (block) {
    const code = getValue(block, "SCRIPT");
    try {
        if (code) {
            // eslint-disable-next-line
            const f = new Function(code);
            f();
        } else {
            throw new Error();
        }
    } catch(err) {
        return "Error: wrong script!";
    }
    return "OK"
};

Blockly.JavaScript['create_incident_field'] = function (block) {
    const emailObject = {
        subject: getValue(block, 'SUBJECT'),
        message: getValue(block, 'BODY'),
        priority: getValue(block, 'PRIORITY'),
        email: getValue(block, 'RESP'),
    };

    const code = validateObj(emailObject);

    if (code === "OK") {
        // eslint-disable-next-line
        const emailJson = JSON.stringify(emailObject);
    }

    return code;
};

Blockly.JavaScript['event_occur'] = function (block) {
    const eventType = getValue(block, 'EVENT_TYPE');

    if (eventType !== "NONE") {
        // eslint-disable-next-line
        const eventTypeJson = JSON.stringify(eventType);
        return "OK";
    } else {
        return "Error: event type not selected!";
    }
};