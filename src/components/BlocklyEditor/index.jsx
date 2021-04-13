import React from 'react';
import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly/core';
import BlocklyComponent from './Blockly';
import Toolbox from './components/Toolbox';
import PopUpWindow from './components/PopUpWindow';
import { createVariablesFunc } from './utils/utils';
import './blocks/customblocks';
import './generator/generator';
import './index.css';

class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.state = {
      isVisible: false,
      blocks: this.props.blocks,
      variables: JSON.parse(window.localStorage.getItem("savedVariables")) || this.props.variables,
      newVariable: {
        name: '',
        type: 'none',
        description: '',
        defaultValue: ''
      },
      warningText: '',
    }
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

  registerDynamicTooltipsAndDefaultValues(vars) {
    Blockly.Extensions.register('dynamic_tooltips_and_defaultValues',
      function (variables = vars) {
        const mouseDownDefaultFunc = this.onMouseDown_;
        let findVariableFunc = function () {
          const name = this.getField('VAR').getVariable().name;
          const var0 = variables.find(variable => variable.name === name);
          this.getField('VAR').DEFAULT_VALUE = var0.defaultValue;
          this.getField('VAR').setTooltip(var0.description);
          this.setTooltip(var0.description);
          findVariableFunc = null;
        }
        this.onMouseDown_ = function (a) {
          if (findVariableFunc) {
            findVariableFunc.bind(this)();
          }
          return mouseDownDefaultFunc.apply(this, [a]);
        }
      }
    );
  }

  registerDynamicClearingTextField() {
    Blockly.Extensions.register('clearing_text_field',
      function () {
        const arrayOfClearingFields = [];

        const clearValueFunc = function (elem) {
          this.sourceBlock_.NEW_SELECTED_FIELD = elem;
          const entry = arrayOfClearingFields.includes(elem);
          if (!entry) {
            arrayOfClearingFields.push(elem)
            this.setValue('');
          }
        }

        const returnOldValueToField = function (selector) {
          const elem = this.getField(selector);
          if (elem.NEW_VALUE === '') {
            elem.setValue(elem.OLD_VALUE)
          }
          const index = arrayOfClearingFields.indexOf(selector);
          arrayOfClearingFields.splice(index, 1);
        }

        this.onchange = (event) => {
          if (event.element === 'field') {
            if (this.NEW_SELECTED_FIELD === event.name) {
              this.getField(event.name).OLD_VALUE = event.oldValue
              this.getField(event.name).NEW_VALUE = event.newValue
              if (this.OLD_SELECTED_FIELD && this.OLD_SELECTED_FIELD !== this.NEW_SELECTED_FIELD) {
                returnOldValueToField.bind(this)(this.OLD_SELECTED_FIELD);
              }
              this.OLD_SELECTED_FIELD = event.name
            } 
          }
          if (event.element === 'click') {
            returnOldValueToField.bind(this)(this.NEW_SELECTED_FIELD);
          }
        }

        const arrayOfTextFields = [];
        this.inputList.forEach((elem) => {
          if (elem.fieldRow[1]) {
            arrayOfTextFields.push(elem.fieldRow[1].name);
          }
        })
        const mouseDownNewFunc = (elem) => {
          const mouseDownDefaultFunc = this.getField(elem).onMouseDown_;
          this.getField(elem).onMouseDown_ = function (a) {
            if (clearValueFunc) {
              clearValueFunc.bind(this)(elem);
            }
            return mouseDownDefaultFunc.apply(this, [a]);
          }
        }
        arrayOfTextFields.forEach(elem => mouseDownNewFunc(elem))
      }) 
  }

  createVariable = (e) => {
    e.preventDefault();
    const variable = {...this.state.newVariable};
    createVariablesFunc(this.state.variables, variable, this);
  }

  cancelVariableCreation = (e) => {
    e.preventDefault();
    const classes = e.target.classList;
    if (classes.contains('popup--button-cancel') || classes.contains('popup--container')) {
      this.setState({
        isVisible: false,
        newVariable: {
          name: '',
          type: 'none',
          description: '',
          defaultValue: ''
        },
        warningText: ''
      });
    }
  }

  handleInputChange = (event) => {
    const newVar = {};
    newVar[event.target.id] = event.target.value;
    this.setState({ newVariable: { ...this.state.newVariable, ...newVar }});
  }

  componentDidMount() {
    Blockly.mainWorkspace.registerButtonCallback("createVariable", () => {
      this.setState({isVisible: true});
    });
    this.registerGeneratorOptionsForEventOccurBlock();
    this.registerDynamicClearingTextField();
    this.registerDynamicTooltipsAndDefaultValues(this.state.variables);
    this.loadWorkspace();
  }

  componentWillUnmount() {
    Blockly.Extensions.unregister('dynamic_menu_extension');
    Blockly.Extensions.unregister('clearing_text_field');
    Blockly.Extensions.unregister("dynamic_tooltips_and_defaultValues");
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.current.workspace);
    code = JSON.stringify(code);
    console.log(JSON.parse(code));
  }

  saveWorkspace = () => {
    const xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    window.localStorage.setItem("savedWorkspace", xmlText);
    window.localStorage.setItem("savedVariables", JSON.stringify(this.state.variables));
  }

  loadWorkspace = () => {
    const xml_text = window.localStorage.getItem("savedWorkspace") || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
    const xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
  }

  clearLocalStorage = () => {
    window.localStorage.removeItem("savedWorkspace");
    window.localStorage.removeItem("savedVariables");
  }

  render() {
    return (
      <div className="BlocklyEditor">
        <header className="BlocklyEditor--header">
          <div className="BlocklyEditor--buttons">
            <PopUpWindow 
              clickButton={this.createVariable} 
              isVisible={this.state.isVisible} 
              clickArea={this.cancelVariableCreation} 
              values={this.state.newVariable}
              handleInputChange={this.handleInputChange}
              warningText={this.state.warningText}
            />
            <button onClick={this.generateCode}>Convert</button>
            <button onClick={this.saveWorkspace}>Save</button>
            <button onClick={this.clearLocalStorage}>Clear localStorage</button>
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