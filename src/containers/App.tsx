import * as React from 'react';
import { Provider } from 'react-redux';
import { rootStore } from '../reducers';

import ErrorBoundary from './ErrorBoundary';
import RootContainer from './Root';
import Router from './Router';

const App = () => {
  return (
    <Provider store={rootStore}>
      <ErrorBoundary>
        <RootContainer />
        <Router />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
