import React from 'react';
import { FormGroup, TextInput } from 'nsw-ds-react/forms';

export default function FormTextInput(props) {
  const { formItem, setItemValue } = props;
  const defaultStyle = {
    marginBottom: '4%'
  }

  // Set the step for float values. Modify '0.01' to the desired decimal precision.
  // const stepValue = formItem.value_type === 'Float' ? '0.01' : '1';

  return (
    <FormGroup
      htmlId={formItem.name}
      helper={<span dangerouslySetInnerHTML={{ __html: formItem.metadata.display_question }} />} // primary label with URL
      label={formItem.metadata.label} // helper text (secondary label)
      error="Invalid value!" // error text if invalid
      status={formItem.invalid ? 'invalid' : ''} // if `true` renders invalid formatting
      statusText={formItem.invalidText ? formItem.invalidText : ''}
      style={formItem.hide ? {...defaultStyle, display: 'none'} : defaultStyle}
    >
      <TextInput
        htmlId={formItem.name}
        className="nsw-col-lg-6"
        data-ui-name={formItem.name}
        as="input"
        number={['Float', 'Int'].includes(formItem.value_type)}
        type={['Float', 'Int'].includes(formItem.value_type) ? 'number' : 'text'}
        placeholder="Enter value"
        value={formItem.form_value}
        onChange={setItemValue}
        required
        readOnly={formItem.read_only ? true : false}
        min={['Float', 'Int'].includes(formItem.value_type) ? '0' : '0'} // Set min to 0 for Float and Integer types
        status={formItem.invalid ? 'invalid' : 'default'}
      />
    </FormGroup>
  );
}
