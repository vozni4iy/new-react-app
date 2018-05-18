import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './reducers/index';
import Main from './containers/Main';
import About from './containers/About';
import BlackBox from './containers/BlackBox';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/about" component={About}/>
          <Route path="/blackbox" component={BlackBox}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
