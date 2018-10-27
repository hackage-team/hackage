import * as React from 'react';
import { Provider } from 'react-redux';
import { rootStore } from '../reducers';
import Router from './Router';

const App = () => {
  return (
    <Provider store={rootStore}>
      <Router />
    </Provider>
  );
};

export default App;
