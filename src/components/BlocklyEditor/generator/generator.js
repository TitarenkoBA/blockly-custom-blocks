import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { getValue, validateEmail, validateObj } from '../utils/utils'

Blockly.JavaScript['send_mail_field'] = function (block) {
    const emailObject = {
        emailFrom: validateEmail(getValue(block, 'FROM')),
        emailTo: validateEmail(getValue(block, 'TO')),
        subject: getValue(block, 'SUBJECT'),
        message: getValue(block, 'BODY')
    };

    const code = validateObj(emailObject);

    if (code === "OK \n") {
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
        return "Error: wrong script! \n";
    }
    return "OK \n"
};

Blockly.JavaScript['create_incident_field'] = function (block) {
    const emailObject = {
        subject: getValue(block, 'SUBJECT'),
        message: getValue(block, 'BODY'),
        priority: getValue(block, 'PRIORITY'),
        email: validateEmail(getValue(block, 'RESP')),
    };

    const code = validateObj(emailObject);

    if (code === "OK \n") {
        // eslint-disable-next-line
        const emailJson = JSON.stringify(emailObject);
    }

    return code;
};

Blockly.JavaScript['event_occur'] = function (block) {
    const eventType = getValue(block, 'EVENT_TYPE');
    const statement = Blockly.JavaScript.statementToCode(block, 'INPUT');

    if (eventType !== "NONE") {
        // eslint-disable-next-line
        const eventTypeJson = JSON.stringify(eventType);
        if (statement) {
            return statement;
        } else {
            return "Error: statement is empty! \n";
        }
    } else {
        return "Error: event type not selected! \n";
    }
};

Blockly.JavaScript['variables_get_string'] = function (block) {
    const code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME);
    return code;
};

Blockly.JavaScript['variables_get_integer'] = function (block) {
    const code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME);
    return code;
};

Blockly.JavaScript['variables_set_string'] = function (block) {
    const argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['variables_set_integer'] = function (block) {
    const argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' = ' + argument0 + ';\n';
};