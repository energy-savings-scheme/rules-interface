import React from 'react';
import { FormGroup, Select } from 'nsw-ds-react/forms';

export default function DropDownMenu(props) {
  const { formItem, setItemValue } = props;
  const defaultStyle = {
    marginBottom: '4%'
  }

  const possibleValues = [];
  if (formItem.defaultOption) {
    possibleValues.push(formItem.defaultOption);
  } else {
    possibleValues.push({ text: 'Please select', value: '', disabled: true });
  }

  if (formItem && formItem.possible_values) {
    Object.entries(formItem.possible_values).map((dictArray) => {
      possibleValues.push({ text: dictArray[1], value: dictArray[0] });
    });
  }

  return (
    <FormGroup
      htmlId={formItem.name}
      helper={<span dangerouslySetInnerHTML={{ __html: formItem.metadata.display_question }} />} // primary label
      label={formItem.metadata.label} // primary question text
      error="Invalid value!" // error text if invalid
      status={formItem.invalid ? 'invalid' : ''} // if `true` renders invalid formatting
      statusText={formItem.invalidText ? formItem.invalidText : ''}
      style={formItem.hide ? {...defaultStyle, display: 'none'} : defaultStyle}
    >
      <Select
        htmlId={formItem.name}
        className="nsw-col-lg-6"
        data-ui-name={formItem.name}
        options={possibleValues}
        onChange={setItemValue}
        value={formItem.form_value}
        required
        status={formItem.invalid ? 'invalid' : ''}
      />
    </FormGroup>
  );
}
