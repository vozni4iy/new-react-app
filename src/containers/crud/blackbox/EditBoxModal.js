import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Modal from '../../components/decorate/Modal';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import {
  updateCategory,
} from '../../actions/CategoryActions';

class EditBoxModal extends Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
    categoryList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    updateCategory: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }

  constructor(props) {
      super(props);
      this.state = {
        categoryList: [...props.categoryList],
      };
      this.state.categoryList.unshift({
        title: 'no parent',
        _id: null,
      });
  }

  handleUpdateCategory = (category) => {
    const data = {
      _id: this.props.id,
      title: category.title,
    };
    if (category.parent) {
      data.parentId = category.parent;
    }
    this.props.updateCategory(data);
  }

  render() {
    const {
      onModalClose,
      handleSubmit,
    } = this.props;
    const { categoryList } = this.state;
    return (
      <Modal
        open
        submitTitle="Update"
        onModalClose={onModalClose}
        onSubmit={handleSubmit(this.handleUpdateCategory)}
      >
        <CreateCategoryForm
          categoryList={categoryList}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const blackBox = state.blackBox.item;
  const chosen = categoryList.find(item => item._id === props.id);
  const initialValues = {
    title: chosen.title,
    parent: chosen.parentId,
  };
  return {
    categoryList,
    initialValues,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editBoxForm',
  enableReinitialize: true,
})(EditBoxModal));
