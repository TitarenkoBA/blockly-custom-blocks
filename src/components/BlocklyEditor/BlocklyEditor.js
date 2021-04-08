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

  registerDynamicTooltips() {
    const vars = this.state.variables;
    Blockly.Extensions.register('dynamic_tooltips',
      function (variables = vars) {
        // const var0 = variables.find((variable) => {
        //   return variable.name = this.getField('VAR')
        // });
        // this.setTooltip(var0.discription);
      }
    );
  }

  registerDynamicDefaultValues() {
    const vars = this.state.variables;
    Blockly.Extensions.register('dynamic_defaultValues',
      function (variables = vars) {

        // const var0 = variables.find((variable) => {
        //   return variable.name = this.getField('VAR')
        // });
        // this.getField('VAR').DEFAULT_VALUE = var0.defaultValue;
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
            // console.log(this.getText())
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
    const variable = {...this.state.newVariable};

    const toolbox = Blockly.mainWorkspace.getToolbox();
    const newContnentsArray = [...toolbox.getToolboxItemById('categoryVars').getContents()]
      .map((item) => item.blockxml);

    const checkingName = newContnentsArray.slice(1).find((item) => item.innerText.trim() === variable.name);

    if (!checkingName) {
      if (variable.type !== "none") {
        this.setState({ warningText: "" })

        function createGetterSetter(item) {
          const xmlField = Blockly.utils.xml.createElement('field');
          xmlField.setAttribute('name', 'VAR');
          xmlField.setAttribute('variabletype', variable.type === "string" ? "String" : "Number");
          xmlField.appendChild(Blockly.utils.xml.createTextNode(variable.name));
          const xmlBlock = Blockly.utils.xml.createElement('block');
          xmlBlock.setAttribute('type', `variables_${item}_${variable.type}`);
          xmlBlock.appendChild(xmlField);
          return xmlBlock;
        }

        // function createGetterSetterBlockly(item) {
        //   const Field = new Blockly.FieldVariable(
        //     variable.name,
        //     null, 
        //     [variable.type === "string" ? "String" : "Number"],
        //     variable.type === "string" ? "String" : "Number")
        //   Field.DEFAULT_VALUE = variable.defaultValue;
        //   Field.setTooltip(variable.description);
        //   const Block = new Blockly.Block(toolbox.getWorkspace(), `variables_${item}_${variable.type}`);
        //   Block.appendField(Field);
        //   return Block;
        // }

        const newVariable = {
          newGetVariable: createGetterSetter('get'),
          newSetVariable: createGetterSetter('set')
        }

        let button = `<button callbackKey="createVariable" text="Create new variable" />`
        button = Blockly.Xml.textToDom(button);

        newContnentsArray.splice(0, 1);
        newContnentsArray.push(newVariable.newGetVariable, newVariable.newSetVariable)
        newContnentsArray.unshift(button);
        toolbox.getToolboxItemById('categoryVars').updateFlyoutContents(newContnentsArray)
        toolbox.refreshSelection()

        const newVariablesArray = [...this.state.variables];
        newVariablesArray.push(variable)

        this.setState({ 
          isVisible: false, 
          newVariable: {
            name: '',
            type: 'none',
            description: '',
            defaultValue: ''
          },
          variables: [...newVariablesArray]
        });
      } else {
        this.setState({warningText: "Warning: variable type not choosen!"})
      }
    } else {
      this.setState({ warningText: "Warning: variable name already exists!" })
    }
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
    this.registerDynamicTooltips();
    this.registerDynamicDefaultValues();
    this.loadWorkspace();
  }

  componentWillUnmount() {
    Blockly.Extensions.unregister('dynamic_menu_extension');
    Blockly.Extensions.unregister('clearing_text_field');
    Blockly.Extensions.unregister("dynamic_tooltips");
    Blockly.Extensions.unregister("dynamic_defaultValues");
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