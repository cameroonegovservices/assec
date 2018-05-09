import React from 'react';
import createDecorator from 'final-form-calculate';

// application
import { GET_BLOCK, UPDATE_BLOCK } from './../../apolloql';
import TextInput from './../ui/forms/TextInput';
import { slugify } from './../../core/utils/slugify';
import withEditPopin from './../ui/popins/withEditPopin';
import MarkdownInput from './../ui/forms/MarkdownInput';

const calculator = createDecorator({
  field: 'label',
  updates: { slug: label => slugify(label) },
});

const validator = (values) => {
  const errors = {};
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.content || values.content === '') {
    errors.content = 'Required';
  }
  return errors;
};

const BlockPopin = () => (
  <div className="flex-rows">
    <TextInput inline name="label" label="Titre de la block" />
    <TextInput disabled
      inline
      name="slug"
      className="inline"
      label="Identifiant du block" />
    <MarkdownInput inline name="content" label="Contenu du block" />
  </div>
);

export default withEditPopin(BlockPopin, {
  validator,
  calculator,
  query: GET_BLOCK,
  entityname: 'block',
  mutation: UPDATE_BLOCK,
  suptitle: "Modification d'un Block CMS",
});
