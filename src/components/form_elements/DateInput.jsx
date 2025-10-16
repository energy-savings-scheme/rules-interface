import React from 'react';

import { FormGroup, TextInput } from 'nsw-ds-react/forms';

export default function DateInput(props) {
  const { formItem, setItemValue } = props;

  return (
    <FormGroup
      // label={formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name} // primary label
      helper={formItem.metadata.display_question} // helper text (secondary label)
      error="Demonstration error text!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <TextInput
        className="nsw-col-lg-6"
        style={{ maxWidth: '50%', marginBottom: '4%' }}
        as="input"
        type="date"
        status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
        placeholder="Enter value"
        value={formItem.form_value}
        onChange={setItemValue}
        required
      />
    </FormGroup>
  );
}
