import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider, SelectedModals } from './context/Modal';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();


function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <SelectedModals />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
