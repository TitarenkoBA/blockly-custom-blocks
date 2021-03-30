import React from 'react';

import BlocklyComponent from './Blockly';

import BlocksList from './BlocksList';

import BlocklyJS from 'blockly/javascript';

import Blockly from 'blockly/core';

import './BlocklyEditor.css';

import './blocks/customblocks';
import './generator/generator';

class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }
  state = {
    blocks: this.props.blocks,
    variables: this.props.variables,
  };

  componentDidMount() {
    this.simpleWorkspace.current.workspace.registerButtonCallback("createStringVariable", (button) => {
      Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'string')
    });
    this.simpleWorkspace.current.workspace.registerButtonCallback("createIntVariable", (button) => {
      Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'int')
    });
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    code = JSON.stringify(code);
    console.log(JSON.parse(code));
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
      <div className="BlocklyEditor">
        <header className="BlocklyEditor-header">
          <div className="BlocklyEditor-buttons">
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
            <BlocksList blocks={this.state.blocks} variables={this.state.variables} />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}

export default BlocklyEditor