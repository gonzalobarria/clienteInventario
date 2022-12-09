import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { API } from './helpers/axios';

const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));

const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  fetcher: (url) => API.get(url).then((res) => res.data),
};

const Main = () => {
  return (
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <SWRConfig value={swrOptions}>
          <App />
        </SWRConfig>
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
