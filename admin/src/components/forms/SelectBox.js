import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const SelectBox = ({
  label, name, multiple, provider,
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <span className="selectbox">
        <Field name={name} id={name} component="select" multiple={multiple}>
          <option />
          {provider &&
            provider.map(obj => <option value={obj.id}>{obj.name}</option>)}
        </Field>
      </span>
    </label>
  </p>
);

SelectBox.defaultProps = {
  multiple: false,
};

SelectBox.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default SelectBox;
