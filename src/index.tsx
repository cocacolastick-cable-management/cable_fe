import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import RootRouter from "./routers/root.router";
import { Provider } from 'react-redux'
import RootStore from "./stores/root.store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
   <Suspense>
      <Provider store={RootStore}>
         <RootRouter/>
      </Provider>
   </Suspense>
  // </React.StrictMode>
);

reportWebVitals();
