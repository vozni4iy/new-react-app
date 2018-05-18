import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import Modal from '../../components/decorate/Modal';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import {
  createCategory,
} from '../../actions/CategoryActions';

class CreateCategoryModal extends Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
    categoryList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    createCategory: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);
      console.log('create constructor called: ', props);
      this.state = {
        categoryList: [...props.categoryList],
      };
      this.state.categoryList.unshift({
        title: 'no parent',
        _id: null,
      });
  }

  handleCreateCategory = (category) => {
    console.log(category);
    const data = {
      title: category.title,
    };
    if (category.parent !== 'no parent') {
      data.parentId = category.parent;
    }
    this.props.createCategory(data);
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
        submitTitle="Create"
        onModalClose={onModalClose}
        onSubmit={handleSubmit(this.handleCreateCategory)}
      >
        <CreateCategoryForm
          categoryList={categoryList}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({
  category: { list },
}) => ({
  categoryList: list,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'createCategoryForm',
})(withRouter(CreateCategoryModal)));
