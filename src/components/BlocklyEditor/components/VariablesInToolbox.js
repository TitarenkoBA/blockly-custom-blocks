import React from 'react';
import { Block, Field } from '../Blockly';

const VariablesInToolbox = (props) => {
  return (
    props.variables.map((variable, index) => {
      return (
        <React.Fragment key={index}>
          <Block type={`variables_get_${variable.type}`} varName={variable.name}>
            <Field
              name="VAR"
              variabletype={variable.type === "string" ? "String" : "Number"}
              varName={variable.name}>
                {variable.name}
            </Field>
          </Block>
          <Block type={`variables_set_${variable.type}`}>
            <Field 
              name="VAR"
              variabletype={variable.type === "string" ? "String" : "Number"}
              varName={variable.name}>
                {variable.name}
            </Field>
          </Block>
        </React.Fragment>
      )
    })
  )
}

export default VariablesInToolbox;