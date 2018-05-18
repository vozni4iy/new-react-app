import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';

const directions = ['up', 'down'];

class ChooseDir extends Component {
  render() {
    const { onSubmit, handleSubmit } = this.props;
    return (
      <div>
        <form>
          <div className="form-wrapper">
            <div className="form-group">
              <label>
                Direction
              </label>

              <div>
                <Field
                  label="Direction"
                  component="select"
                  name="direction"
                  placeholder="Choose direction"
                >
                  {directions.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <button onClick={handleSubmit(onSubmit)}>Submit</button>

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    initialValues: {
      direction: directions[0],
    },
  });

export default connect(mapStateToProps, null)(reduxForm({
  form: 'createItemForm',
  enableReinitialize: true,
})(ChooseDir));
