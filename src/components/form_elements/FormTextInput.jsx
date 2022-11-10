import React from 'react';

import { FormGroup, TextInput } from 'nsw-ds-react/forms';

export default function FormTextInput(props) {
  const { formItem, setItemValue } = props;

  return (
    <FormGroup
      helper={formItem.metadata.display_question} // primary label
      label={formItem.metadata.label} // helper text (secondary label)
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <TextInput
        style={{ maxWidth: '50%' }}
        as="input"
        number={['Float', 'Integer'].includes(formItem.value_type)}
        type={['Float', 'Integer'].includes(formItem.value_type) ? 'number' : 'text'}
        status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
        placeholder="Enter value"
        value={formItem.form_value}
        onChange={setItemValue}
        required
        readOnly={formItem.read_only ? true : false}
      />
    </FormGroup>
  );
}
