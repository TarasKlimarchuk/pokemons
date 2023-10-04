import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/reset.css';
import './index.scss';

import App from './App';
import ReduxProvide from './store/ReduxProvide';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <ReduxProvide>
      <App />
    </ReduxProvide>
  </BrowserRouter>
);
