import React from 'react';

import BlocklyComponent from './Blockly';

import BlocksList from './BlocksList';

import BlocklyJS from 'blockly/javascript';

import Blockly from 'blockly/core';

import './BlocklyApp.css';

import './blocks/customblocks';
import './generator/generator';

const blocks =[
  "send_mail_field",
  "create_incident_field",
  "run_script_field",
  "controls_ifelse",
  "logic_compare",
  "logic_operation",
  "controls_repeat_ext",
  "logic_operation",
  "logic_negate",
  "logic_boolean",
  "logic_null",
  "logic_ternary",
  "text_charAt",
  "variables_get",
  "variables_set",
  "text",
  "math_number"
];

class BlocklyApp extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(code);
  }

  saveWorkspace = () => {
    const xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    window.localStorage.setItem("savedWorkspace", xmlText);
  }

  loadWorkspace = () => {
    return window.localStorage.getItem("savedWorkspace") || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
  }

  render() {
    return (
      <div className="BlocklyApp">
        <header className="BlocklyApp-header">
          <div className="BlocklyApp-buttons">
            <button onClick={this.generateCode}>Convert</button>
            <button onClick={this.saveWorkspace}>Save</button>
          </div>
          <BlocklyComponent 
            ref={this.simpleWorkspace}
            readOnly={false} trashcan={true} media={'media/'}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true
            }}
            initialXml={this.loadWorkspace()}>
            <BlocksList blocks={blocks} />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}

export default BlocklyApp