import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../style/Modal.css';
import {
  showBodyScroll,
  hideBodyScroll,
} from '../../lib/bodyScrollToggle';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.shape().isRequired,
    submitTitle: PropTypes.string,
    cancelTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitTitle: 'Submit',
    cancelTitle: 'Cancel',
  }

  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open) {
      hideBodyScroll();
      return {
        display: true
      };
    }
    return null;
  }

  handleSubmit = () => {
    this.props.onSubmit();
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      display: false,
    });
    showBodyScroll();
    this.props.onModalClose && this.props.onModalClose();
  }

  render() {
    const {
      children,
      submitTitle,
      cancelTitle,
    } = this.props;
    const { display } = this.state;
    return (
      <div
        className={display ? 'modal-wrapper' : 'display-none'}
        onClick={this.closeModal}
      >
        <div className="modal-inner"
          onClick={(e) => { e.stopPropagation(); }}
        >
          {children}
          <div className="button-wrapper">
            <button onClick={this.handleSubmit}>{submitTitle}</button>
            <button onClick={this.closeModal}>{cancelTitle}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
