import * as React from 'react';
import { Provider } from 'react-redux';
import { rootStore } from '../reducers';

import RootContainer from './Root';
import Router from './Router';

const App = () => {
  return (
    <Provider store={rootStore}>
      <>
        <RootContainer />
        <Router />
      </>
    </Provider>
  );
};

export default App;
