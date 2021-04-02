import React from 'react';

import BlocksInToolbox from './BlocksInToolbox';
import VariablesInToolbox from './VariablesInToolbox';

import { Category, Block } from './Blockly';

class Toolbox extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Category name="Blocks">
          <BlocksInToolbox blocks={this.props.blocks} />
        </Category>
        <Category name="Variables" toolboxitemid="categoryId">
          <Block type="variables_adding_form" />
          {/* <Button text="Create string variable" callbackKey="createStringVariable" />
          <Button text="Create integer variable" callbackKey="createIntVariable" /> */}
          <VariablesInToolbox variables={this.props.variables} />
        </Category>
      </React.Fragment>
    );
  }
}

export default Toolbox;