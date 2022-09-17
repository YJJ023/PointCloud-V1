import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/* import App from './App'; */
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
const App =lazy(()=>import('./App'))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<div className='aa'>4455</div>}>
    <App /></Suspense>
 </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
