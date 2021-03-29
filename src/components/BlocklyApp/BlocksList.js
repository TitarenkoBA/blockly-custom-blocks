import React from 'react';

import { Block } from './Blockly';

const BlocksList = props => (
  <React.Fragment>
    {props.blocks.map((blockType, index) => {
      return (
        <Block
          key={index}
          type={blockType}
        />
      )
    })}
  </React.Fragment>
);

export default BlocksList