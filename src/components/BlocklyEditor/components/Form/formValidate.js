export const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please, enter variable name!';
  } 
  if (!values.type) {
    errors.type = 'The type of variable is not choosen!';
  }
  if (!values.defaultValue) {
    errors.defaultValue = 'Please, enter variable default value!';
  }
  if (values.type === "integer") {
    if (!Number.parseInt(values.defaultValue)) {
      errors.defaultValue = 'The value does not match the type of the variable!';
    }
  }
  return errors
};