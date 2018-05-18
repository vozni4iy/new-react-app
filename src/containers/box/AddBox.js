import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';

const elemValues = [1, 3, 5, 7, 9];

class AddBox extends Component {
  render() {
    const { oldLayer, onSubmit, handleSubmit, needWeight } = this.props;
    return (
      <div>
        <form>
          <div className="form-wrapper">
            <div className="form-group">
              <label>
                Name
              </label>

              <div>
                <Field
                  label="Name"
                  component="input"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            {
              needWeight &&
              <div className="form-group">
                <label>
                  Weight
                </label>

                <div>
                  <Field
                    label="Weight"
                    component="select"
                    name="weight"
                    placeholder="Enter weight"
                  >
                    {elemValues.map(value => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            }

            {
              oldLayer.map(item => (
                <div key={item.id}>
                  <div className="form-group">
                    <label>
                      {item.name}
                    </label>

                    <div>
                      <Field
                        label="Priority"
                        component="select"
                        name={String(item.id)}
                        placeholder="Choose Priority"
                      >
                        {elemValues.map(value => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              ))
            }

              <button onClick={handleSubmit(onSubmit)}>Submit</button>

            </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const initialValues = {};
  props.oldLayer.forEach((item) => {
    initialValues[item.id] = elemValues[0];
  });
  if (props.needWeight) {
    initialValues.weight = elemValues[0];
  }
  return {
    initialValues,
  }
};

export default connect(mapStateToProps, null)(reduxForm({
  form: 'createItemForm',
  enableReinitialize: true,
})(AddBox));
