import React from 'react';
import Router from './router';
import { ModalProvider } from './contexts/ModalContext';

const App: React.FC = () => (
  <ModalProvider>
    <Router />
  </ModalProvider>
);

export default App;
