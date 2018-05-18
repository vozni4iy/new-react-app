import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import '../style/App.css';
import {
  getAllCategory,
} from '../actions/CategoryActions';
import Header from '../components/decorate/Header';
import CreateCategoryModal from './crud/CreateCategoryModal';
import UpdateCategoryModal from './crud/UpdateCategoryModal';
import DeleteCategoryModal from './crud/DeleteCategoryModal';

class Main extends Component {
  static propTypes = {
    getAllCategory: PropTypes.func.isRequired,
    categoryTree: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  constructor(props) {
    super(props);
    console.log('main props: ', props);
    this.props.getAllCategory();
    this.state = {
      initialValues: {},
      currentId: null,
      showModal: false,
      showCreate: false,
      showUpdate: false,
      showDelete: false,
    };
  }

  handleEdit = id => {
    this.setState({
      showUpdate: true,
      currentId: id,
    });
  }

  handleDelete = id => {
    this.setState({
      showDelete: true,
      currentId: id,
    });
  }

  showCreateModal = () => {
    this.setState({
      showCreate: true,
    });
  }

  onModalsClose = () => {
    this.setState({
      showCreate: false,
      showUpdate: false,
      showDelete: false,
    });
  }

  displayTree = (tree, level) => {
    const treeView = [];
    tree.forEach(branch => {
      if (!branch.children) {
        console.log('action error');
      } else {
        treeView.push(
          <div key={branch._id}>
            <div style={{ width: 10*level, height: '20px' }}></div>
            <div>{branch.title}</div>
            <button onClick={() => { this.handleEdit(branch._id) }}>Edit</button>
            <button onClick={() => { this.handleDelete(branch._id) }}>Delete</button>
          </div>
        );
        if (branch.children.length !== 0) {
          treeView.push(this.displayTree(branch.children, level + 1));
        }
      }
    });
    return treeView;
  }

  render() {
    const { categoryTree } = this.props;
    const {
      showCreate,
      showUpdate,
      showDelete,
      currentId,
    } = this.state;
    const dummyHistory = { dummy: true };
    return (
      <div className="App">
        <Header />
        <div className="listWrapper">
          {this.displayTree(categoryTree, 0)}
        </div>
        <button onClick={this.showCreateModal}>Create new category</button>
        <button onClick={() => { this.props.history.push('/about')}}>Go to about</button>
        { showUpdate &&
          <UpdateCategoryModal
            onModalClose={this.onModalsClose}
            id={currentId}
          />
        }
        { showCreate &&
          <CreateCategoryModal
            onModalClose={this.onModalsClose}
            history={dummyHistory}
          />
        }
        { showDelete &&
          <DeleteCategoryModal
            onModalClose={this.onModalsClose}
            id={currentId}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({
  category: { all },
}) => ({
  categoryTree: all,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
