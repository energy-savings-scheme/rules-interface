import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VariableSearchBar(props) {
  const { variables } = props;

  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // We add logic here to reduce the number of searchable variables
  // So far we filter by:
  //      i) variable has an 'alias'
  //      ii) variable has children
  // QUESTION - how do we want to do this?
  var searchable_variables = variables
    .filter((item) => item.metadata.alias)
    .filter((item) => item.children.length > 0);

  return (
    <div
      className="nsw-col nsw-col-md-3 nsw-offset-md-3"
      style={{ marginTop: 80, marginBottom: 80 }}
    >
      <div className="nsw-form-search">
        <label for="hero-search-input" className="sr-only">
          Search a term below to find more information on related methods and requirements:
        </label>
        <input
          className="nsw-form-search__input"
          list="variables"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <datalist id="variables">
          {searchable_variables.map((variable) => (
            <option value={variable.metadata.alias} />
          ))}
        </datalist>
        <button
          className="nsw-form-search__submit"
          onClick={(e) => {
            const match = variables.find((item) => item.metadata.alias === searchTerm);
            history.push(`/variables/${match.name}`);
          }}
          aria-label="search"
        >
          <svg className="nsw-icon" focusable="false" aria-hidden="true">
            <use xlinkHref="#search"></use>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}
