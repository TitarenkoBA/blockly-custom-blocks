import React from 'react';

import BlocksInToolbox from './BlocksInToolbox';
import VariablesInToolbox from './VariablesInToolbox';

import { Category, Button } from '../Blockly';

class Toolbox extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Category name="Blocks" toolboxitemid="categoryBlocks">
          <BlocksInToolbox blocks={this.props.blocks} />
        </Category>
        <Category name="Variables" toolboxitemid="categoryVars">
          <Button callbackKey="createVariable" text="Create new variable" />
          <VariablesInToolbox variables={this.props.variables} />
        </Category>
      </React.Fragment>
    );
  }
}

export default Toolbox;