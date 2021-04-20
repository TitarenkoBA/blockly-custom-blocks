import React, { Suspense } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form'
import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly/core';
import BlocklyComponent from './Blockly';
import Toolbox from './components/Toolbox';
import PopUpWindow from './components/PopUpWindow';
import i18n from "i18next";
import './blocks/customblocks';
import './generator/generator';
import './i18n';
import './index.css';

const reducers = {
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.state = {
      isLangLoaded: true,
      isVisible: false,
      blocks: this.props.blocks,
      variables: this.props.variables,
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

  registerButtonCallback(callback) {
    Blockly.mainWorkspace.registerButtonCallback(callback, () => {
      this.setState({ isVisible: true });
    });
  }

  cancelVariableCreation = (e) => {
    e.preventDefault();
    const classes = e.target.classList;
    if (classes.contains('popup__button-cancel') || classes.contains('popup__container')) {
      this.setState({
        isVisible: false,
      });
    }
  }

  componentDidMount() {
    this.registerButtonCallback("createVariable");
    this.registerGeneratorOptionsForEventOccurBlock();
    this.registerDynamicClearingTextField();
    this.registerDynamicTooltipsAndDefaultValues(this.state.variables);
    this.loadWorkspace();
  }

  componentWillUpdate() {
    this.registerButtonCallback("createVariable");
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
    let content = {
      workspace: xmlText,
      variables: this.state.variables
    };
    content = JSON.stringify(content);
    window.localStorage.setItem("content", content);
  }

  loadWorkspace = () => {
    let content = JSON.parse(window.localStorage.getItem("content")) || null;
    if (content) {
      const workspace = content.workspace;
      const variables = content.variables
      this.setState({ variables: [...variables]});
      const xml = Blockly.Xml.textToDom(workspace);
      Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    }
  }

  clearLocalStorage = () => {
    window.localStorage.removeItem("content");
  }

  changeLanguage = (language) => {
    i18n
      .changeLanguage(language)
      .then(() => { 
        this.setState({ isLangLoaded: false })
        this.setState({isLangLoaded: true})
        this.forceUpdate();
        this.loadWorkspace()
      });
  };

  componentWillMount() {
    this.changeLanguage();
  }

  render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="BlocklyEditor">
            <header className="BlocklyEditor__header">
              <div className="buttons-container">
                <button className="button" onClick={() => this.changeLanguage("en")}>{i18n.t("blockly.buttons.lang-en")}</button>
                <button className="button" onClick={() => this.changeLanguage("ru")}>{i18n.t("blockly.buttons.lang-ru")}</button>
              </div>
              { this.state.isVisible ?
                <PopUpWindow
                variables={this.state.variables}
                context={this}
                cancel={this.cancelVariableCreation.bind(this)}
              /> : ''}
              <div className="buttons-container">
                <button className="button" onClick={this.generateCode}>{i18n.t("blockly.buttons.convert")}</button>
                <button className="button" onClick={this.saveWorkspace}>{i18n.t("blockly.buttons.save")}</button>
                <button className="button" onClick={this.clearLocalStorage}>{i18n.t("blockly.buttons.clear-ls")}</button>
              </div>
              {this.state.isLangLoaded ?
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
                : ''}
            </header>
          </div>
        </Suspense>
      </Provider>
    );
  }
}

export default BlocklyEditor