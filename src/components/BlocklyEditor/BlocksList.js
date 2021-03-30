import React from 'react';

import { Block, Category, Field, Button } from './Blockly';

const BlocksList = props => (
  <React.Fragment>
    <Category name="Blocks">
      {props.blocks.map((blockType, index) => {
        return (
          <Block
            key={index}
            type={blockType}
          />
        )
      })}
    </Category>
    <Category name="Variables" >
      <Button text="Create string variable" callbackKey="createStringVariable" />
      <Button text="Create integer variable" callbackKey="createIntVariable" />
      <Block type="variables_set">
        <Field name="VAR"></Field>
      </Block>
      {props.variables.map((variable, index) => {
        return (
          <Block key={index} type="variables_get">
            <Field name="VAR" variabletype={variable.type}>{variable.name}</Field>
          </Block>
        )
      })}
    </Category>
  </React.Fragment>
);

export default BlocksList