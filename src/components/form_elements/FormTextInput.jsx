import React from 'react';
import { FormGroup, TextInput } from 'nsw-ds-react/forms';

export default function FormTextInput(props) {
  const { formItem, setItemValue } = props;

  // Set the step for float values. Modify '0.01' to the desired decimal precision.
  // const stepValue = formItem.value_type === 'Float' ? '0.01' : '1';

  return (
    <FormGroup
      helper={<span dangerouslySetInnerHTML={{ __html: formItem.metadata.display_question }} />} // primary label with URL
      label={formItem.metadata.label} // helper text (secondary label)
      error="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <TextInput
        style={{ maxWidth: '50%', marginBottom: '4%' }}
        as="input"
        number={['Float', 'Integer'].includes(formItem.value_type)}
        type={['Float', 'Integer'].includes(formItem.value_type) ? 'number' : 'text'}
        placeholder="Enter value"
        value={formItem.form_value}
        onChange={setItemValue}
        required
        readOnly={formItem.read_only ? true : false}
        min={['Float', 'Integer'].includes(formItem.value_type) ? '0' : '0'} // Set min to 0 for Float and Integer types
      />
    </FormGroup>
  );
}
