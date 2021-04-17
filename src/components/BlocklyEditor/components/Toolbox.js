import React from 'react';
import BlocksInToolbox from './BlocksInToolbox';
import VariablesInToolbox from './VariablesInToolbox';
import { Category, Button } from '../Blockly';
import i18n from "i18next";

class Toolbox extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Category name={i18n.t("toolbox.categories.blocks")} toolboxitemid="categoryBlocks">
          <BlocksInToolbox blocks={this.props.blocks} />
        </Category>
        <Category name={i18n.t("toolbox.categories.variables")} toolboxitemid="categoryVars">
          <Button callbackKey="createVariable" text={i18n.t("toolbox.buttons.createVariable")} />
          <VariablesInToolbox variables={this.props.variables} />
        </Category>
      </React.Fragment>
    );
  }
}

export default Toolbox;