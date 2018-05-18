import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import '../style/App.css';
import Header from '../components/decorate/Header';
import AddBox from './box/AddBox';
import ChooseDir from './box/ChooseDir';

class BlackBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldLayer: [],
      newLayer: [],
      editing: false,
      layerCount: 0,
      direction: null,
      mode: 'set',
    };
  }

  addNewLayer = () => {
    const { newLayer, layerCount } = this.state;
    console.log('nextOldLayer: ', newLayer);
    this.setState({
      oldLayer: newLayer,
      newLayer: [],
      layerCount: layerCount + 1,
    });
  }

  createNewItem = (values) => {
    const { newLayer, direction, layerCount } = this.state;
    const id = newLayer.length;
    const hasWeights = (direction === 'down' && layerCount === 0);
    const weight = hasWeights ? values.weight : this.calculateWeight(id, values);
    const item = {
      id,
      name: values.name,
      weight,
    };
    newLayer.push(item);
    this.setState({
      newLayer,
      mode: 'choose',
    });
  }

  editNewItem = () => {
    this.setState({
      mode: 'edit',
    });
  }

  calculateWeight(id, values) {
    const { oldLayer } = this.state;
    if (oldLayer.length === 0) {
      return 1;
    }
    const sum = oldLayer.reduce((a,x) => a + x.weight*values[x.id], 0);
    const weight = sum/oldLayer.length;
    console.log('weight: ', weight);
    return weight;
  }

  showResults = () => {
    const { newLayer } = this.state;
    let maxWeight = 0;
    let priorItem = newLayer[0];
    newLayer.forEach((item) => {
      console.log('name: ', item.name, '; weight: ', item.weight);
      if (item.weight > maxWeight) {
        maxWeight = item.weight;
        priorItem = item;
      }
    });
    console.log('Most priority item is: ', priorItem.name);
  }

  setDirection = ({ direction }) => {
    this.setState({
      mode: 'choose',
      direction,
    });
  }

  render() {
    const {
      layerCount,
      oldLayer,
      newLayer,
      mode,
      direction,
    } = this.state;
    return (
      <div className="App">
        <Header />
        {
          (mode === 'set') && (
            <ChooseDir
              onSubmit={this.setDirection}
            />
          )
        }
        {
          (mode === 'edit') && (
            <AddBox
                onSubmit={this.createNewItem}
                oldLayer={oldLayer}
                needWeight={direction === 'down' && layerCount === 0}
            />
          )
        }
        {
          (mode === 'choose') && (
              <div>
                <button onClick={this.editNewItem}>New item</button>
                {
                  (newLayer.length > 1) &&
                  <button onClick={this.addNewLayer}>New Layer</button>
                }
                {
                  (newLayer.length > 1) && (layerCount > 1) &&
                  <button onClick={this.showResults}>Calculate</button>
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default BlackBox;
