import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { getValue, validateEmail, validateObj } from '../utils/utils'

Blockly.JavaScript['send_mail_field'] = function (block) {
    const emailObject = {
        emailFrom: validateEmail(getValue(block, 'FROM')),
        emailTo: validateEmail(getValue(block, 'TO')),
        subject: getValue(block, 'THEME'),
        message: getValue(block, 'MESSAGE')
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
        subject: getValue(block, 'THEME'),
        message: getValue(block, 'MESSAGE'),
        priority: getValue(block, 'PRIORITY'),
        email: validateEmail(getValue(block, 'RESP')),
    };

    const code = validateObj(emailObject);

    if (code === "OK") {
        // eslint-disable-next-line
        const emailJson = JSON.stringify(emailObject);
    }

    return code;
};