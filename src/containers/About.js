import React, { Component } from 'react';

import '../style/App.css';
import Header from '../components/decorate/Header';

class About extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          About
        </p>
      </div>
    );
  }
}

export default About;
