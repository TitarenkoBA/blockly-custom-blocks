import React from 'react';
import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly/core';
import BlocklyComponent from './Blockly';
import Toolbox from './Toolbox';
import { validateEmail } from './utils/utils'
import './blocks/customblocks';
import './generator/generator';
import './BlocklyEditor.css';

class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  state = {
    blocks: [...this.props.blocks],
    variables: [...this.props.variables]
  }

  generateOptionsForEventOccurBlock() {
    const eventOptions = this.props.eventTypes;
    Blockly.Extensions.register('dynamic_menu_extension',
      function (opts = eventOptions) {
        this.getInput('INPUT')
          .appendField(new Blockly.FieldDropdown(
            function (options = opts) {
              return options.map(option => [option, option]);
            }), "EVENT_TYPE");
      }
    );
  }

  addValidatorToEmailFields() {
    Blockly.Extensions.register('validator_for_email',
      function () {
        ['FROM', 'TO', 'RESP'].forEach((name) => {
          if (this.getField(name)) {
            this.getField(name)
              .setValidator((newValue) => validateEmail(newValue));
          }
        });
      }
    );
  }

  registerButtonCallbackFuncForAddVariableButtons() {
    this.simpleWorkspace.current.workspace.registerButtonCallback("createStringVariable", (button) => {
      Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'string')
    });
    this.simpleWorkspace.current.workspace.registerButtonCallback("createIntVariable", (button) => {
      Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'int')
    }); 
  }

  componentDidMount() {
    this.registerButtonCallbackFuncForAddVariableButtons();
    this.generateOptionsForEventOccurBlock();
    this.addValidatorToEmailFields();
    this.loadWorkspace();
  }

  componentWillUnmount() {
    Blockly.Extensions.unregister('dynamic_menu_extension');
    Blockly.Extensions.unregister('validator_for_email');
    Blockly.mainWorkspace.removeChangeListener(this.listenerForCheckingEmails);
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
    const xml_text = window.localStorage.getItem("savedWorkspace") || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
    const xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
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
            initialXml={'<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'}>
            <Toolbox blocks={this.state.blocks} variables={this.state.variables} />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}

export default BlocklyEditor