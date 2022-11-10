import React from 'react';
import { FormGroup, Select } from 'nsw-ds-react/forms';

export default function DropDownMenu(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [{ text: 'Please select', value: '', disabled: true }];

  if (formItem && formItem.possible_values) {
    Object.entries(formItem.possible_values).map((dictArray) => {
      possibleValues.push({ text: dictArray[1], value: dictArray[0] });
    });
  }

  return (
    <FormGroup
      helper={formItem.metadata.display_question} // primary label
      label={formItem.metadata.label} // primary question text
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <Select
        style={{ maxWidth: '50%' }}
        options={possibleValues}
        onChange={setItemValue}
        value={formItem.form_value}
        required
      />
    </FormGroup>
  );
}
