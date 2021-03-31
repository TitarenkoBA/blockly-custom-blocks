import React from 'react';

import { Block, Category, Field, Button } from './Blockly';

class Toolbox extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Category name="Blocks">
          {this.props.blocks.map((blockType, index) => {
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
          {this.props.variables.map((variable, index) => {
            return (
              <React.Fragment key={index}>
                <Block type="variables_set">
                  <Field name="VAR" variabletype={variable.type}>
                    {variable.name}
                  </Field>
                </Block>
                <Block type="variables_get">
                  <Field name="VAR" variabletype={variable.type}>
                    {variable.name}
                  </Field>
                </Block>
              </React.Fragment>
            )
          })}
        </Category>
      </React.Fragment>
    );
  }
}

export default Toolbox