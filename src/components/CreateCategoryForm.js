import React     from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const CreateCategoryForm = ({ categoryList }) => (
  <form>
    <div className="form-wrapper">
        <Field
          label="Title"
          component="input"
          name="title"
          type="text"
          placeholder="Enter title"
        />

        <Field
          label="Parent"
          component="select"
          name="parent"
          placeholder="Choose parent"
        >
          {categoryList.map(option => (<option key={option._id} value={option._id}>{option.title}</option>))}
        </Field>
      </div>
  </form>
);

CreateCategoryForm.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default CreateCategoryForm;
