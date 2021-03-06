import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const TextInput = ({
  name,
  label,
  inline,
  placeholder,
  autoComplete,
  ...rest
}) => (
  <p>
    <label htmlFor={name} className={inline ? 'inline' : ''}>
      <span>{label}</span>
      <Field {...rest}
        type="text"
        id={name}
        name={name}
        component="input"
        placeholder={placeholder}
        autoComplete={autoComplete ? 'on' : 'off'} />
    </label>
  </p>
);

TextInput.defaultProps = {
  inline: false,
  placeholder: '',
  autoComplete: false,
};

TextInput.propTypes = {
  inline: PropTypes.bool,
  autoComplete: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default TextInput;
