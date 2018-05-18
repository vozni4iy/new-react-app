import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Modal from '../../components/decorate/Modal';
import {
  deleteCategory,
} from '../../actions/CategoryActions';

class DeleteCategoryModal extends Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    categoryList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.categoryList.find(item => item._id === props.id).title,
    };
  }

  handleDeleteCategory = () => {
    this.props.deleteCategory(this.props.id);
  }

  render() {
    const {
      onModalClose,
      handleSubmit,
    } = this.props;
    const { title } = this.state;
    return (
      <Modal
        open
        submitTitle="Delete"
        onModalClose={onModalClose}
        onSubmit={handleSubmit(this.handleDeleteCategory)}
      >
        <div>{`Are you sure to delete ${title}?`}</div>
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
  deleteCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'deleteCategoryForm',
})(DeleteCategoryModal));
