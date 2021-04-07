import React from 'react';
import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly/core';
import BlocklyComponent from './Blockly';
import Toolbox from './components/Toolbox';
import PopUpWindow from './components/PopUpWindow';
import './blocks/customblocks';
import './generator/generator';
import './BlocklyEditor.css';

class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  state = {
    isVisible: "notVisible",
    blocks: this.props.blocks,
    variables: this.props.variables
  }

  registerGeneratorOptionsForEventOccurBlock() {
    const eventOptions = this.props.eventTypes;
    Blockly.Extensions.register('dynamic_menu_extension',
      function (opts = eventOptions) {
        this.getInput('INPUT')
          .appendField(new Blockly.FieldDropdown(
            function (options = opts) {
              let arr = options.map(option => [option, option]);
              arr.unshift(["none", "NONE"]);
              return arr;
            }), "EVENT_TYPE");
      }
    );
  }

  registerDynamicClearingTextField() {
    Blockly.Extensions.register('clearing_text_field',
      function () {
        const arrayOfTextFields = [];

        this.inputList.forEach((elem) => {
          if (elem.fieldRow[1]) {
            arrayOfTextFields.push(elem.fieldRow[1].name);
          }
        })

        const mouseDownNewFunc = (elem) => {
          const mouseDownDefaultFunc = this.getField(elem).onMouseDown_;

          let clearValueFunc = function () {
            // this.DEFAULT_VALUE = this.getValue();
            console.log(this.getText())
            this.setValue('');
            clearValueFunc = null;
          }

          this.getField(elem).onMouseDown_ = function (a) {
            if (clearValueFunc) {
              clearValueFunc.bind(this)();
            }
            return mouseDownDefaultFunc.apply(this, [a]);
          }
        }
        
        arrayOfTextFields.forEach(elem => mouseDownNewFunc(elem))
        
      }) 
  }

  createVariable = (e) => {
    e.preventDefault();
    const variable = {
      name: document.querySelector('#name').value,
      type: document.querySelector('#type').value,
      description: document.querySelector('#description').value,
      defaultValue: "str"
    }
    const toolbox = Blockly.mainWorkspace.getToolbox();
    const newContnentsArray = [...toolbox.getToolboxItemById('categoryVars').getContents()]
      .map((item) => item.blockxml);

    const checkingName = newContnentsArray.slice(1).find((item) => item.innerText.trim() === variable.name);

    if (!checkingName) {
      if (variable.type !== "none") {
        const warning = document.querySelector('#warningText');
        warning.innerText = ""

        const newVariable = {
          newGetVariable: `<block 
        xmlns="http://www.w3.org/1999/xhtml" 
        type="variables_get_custom"
        is="blockly">
          <field 
            name="VAR"
            variabletype="${variable.type}"
            is="blockly"
            
          >${variable.name}</field>
        </block>`,
          newSetVariable: `<block 
        xmlns="http://www.w3.org/1999/xhtml" 
        type="variables_set_custom" 
        is="blockly">
          <field 
            name="VAR"
            variabletype="${variable.type}"
            is="blockly"
          >${variable.name}</field>
        </block>`
        }

        const domNewVariable = {
          domNewGetVariable: Blockly.Xml.textToDom(newVariable.newGetVariable),
          domNewSetVariable: Blockly.Xml.textToDom(newVariable.newSetVariable),
        }

        let button = `<button callbackKey="createVariable" text="Create new variable" />`
        button = Blockly.Xml.textToDom(button);

        newContnentsArray.splice(0, 1);
        newContnentsArray.push(domNewVariable.domNewGetVariable, domNewVariable.domNewSetVariable)
        newContnentsArray.unshift(button);
        toolbox.getToolboxItemById('categoryVars').updateFlyoutContents(newContnentsArray)
        toolbox.refreshSelection()

        this.setState({ isVisible: "notVisible" });
      } else {
        const warning = document.querySelector('#warningText');
        warning.innerText = "Warning: variable type not choosen!"
      }
    } else {
      const warning = document.querySelector('#warningText');
      warning.innerText = "Warning: variable name already exists!"
    }
  }

  componentDidMount() {
    Blockly.mainWorkspace.registerButtonCallback("createVariable", () => {
      this.setState({isVisible: "visible"});
    });

    this.registerGeneratorOptionsForEventOccurBlock();
    this.registerDynamicClearingTextField();
    this.loadWorkspace();
  }

  componentWillUnmount() {
    Blockly.Extensions.unregister('dynamic_menu_extension');
    Blockly.Extensions.unregister('clearing_text_field');
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
            <PopUpWindow 
              clickButton={this.createVariable} 
              isVisible={this.state.isVisible} 
              clickArea={(e) => { e.preventDefault(); this.setState({ isVisible: "notVisible" }) }} />
            <button onClick={this.generateCode}>Convert</button>
            <button onClick={this.saveWorkspace}>Save</button>
          </div>
          <BlocklyComponent 
            ref={this.simpleWorkspace}
            readOnly={false} 
            trashcan={true} 
            media={'media/'}
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