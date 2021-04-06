import React from 'react';
import { Block, Field } from '../Blockly';

const VariablesInToolbox = (props) => {
  return (
    props.variables.map((variable, index) => {
      return (
        <React.Fragment key={index}>
          <Block type="variables_get_custom">
            <Field name="VAR" variabletype={variable.type}>
              {variable.name}
            </Field>
          </Block>
          <Block type="variables_set_custom">
            <Field name="VAR" variabletype={variable.type}>
              {variable.name}
            </Field>
          </Block>
        </React.Fragment>
      )
    })
  )
}

export default VariablesInToolbox;