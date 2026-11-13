import { useState } from 'react';
import { SelectItem } from 'nsw-ds-react/forms';

export const ModelSelect = ({
  htmlId,
  selected,
  options,
  block,
  status,
  className = '',
  ...attributeOptions
}) => {
  const [filter, setFilter] = useState('');

  // Filter the options based on the current filter value
  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      // If backspace, remove the last character from the filter
      setFilter((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      // If it's a single character key, append it to the filter
      setFilter((prev) => prev + e.key);
    }
  };

  return (
    <select
      className={`nsw-form__select ${className}`}
      aria-invalid={status === 'invalid' ? 'true' : ''}
      aria-describedby={status === 'invalid' ? `helper${htmlId} error${htmlId}` : `helper${htmlId}`}
      id={htmlId}
      defaultValue={selected}
      onKeyDown={handleKeyDown}
      {...attributeOptions}
    >
      {filteredOptions.map((option) => (
        <SelectItem key={option.value} {...option} />
      ))}
    </select>
  );
};
