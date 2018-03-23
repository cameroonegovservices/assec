import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

// application
import './choice-button.css';

const ChoiceInput = ({
  id, help, label, values,
}) => (
  <FormSection name={id} component="fieldset">
    <h3>{label}</h3>
    {help && <p>{help}</p>}
    <div className="flex-columns">
      {values.map((obj, index) => (
        <label key={`choiceinput::${obj.id}`}
          className="choice-button items-center"
          htmlFor={`${obj.id}_true`}>
          <Field id={`${obj.id}_true`}
            type="radio"
            name="choice"
            component="input"
            value={`${index}`} />
          <span>{obj.value}</span>
        </label>
      ))}
    </div>
  </FormSection>
);

ChoiceInput.propTypes = {
  id: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default ChoiceInput;