
import React from 'react';
import { Block } from '../Blockly';

const BlocksInToolbox = (props) => {
  return (
    props.blocks.map((blockType, index) => {
      return (
        <Block className="block"
          key={index}
          type={blockType}
        />
      )
    })
  )
}

export default BlocksInToolbox;