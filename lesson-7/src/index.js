import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Clock from './Clock';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

//Clock - component lifecycle
// root.render(
//   <React.StrictMode>
//     <Clock />
//   </React.StrictMode>
// );
// setTimeout(() => {
//   root.render(
//     <React.StrictMode>
//       <div><p>Clock is removed from the DOM.</p></div>
//     </React.StrictMode>
//   );
// }, 10000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
