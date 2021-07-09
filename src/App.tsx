import React from 'react';
import AppRouter from './router';
import { ModalProvider } from './contexts/ModalContext';

const App: React.FC = () => (
  <ModalProvider>
    <AppRouter />
  </ModalProvider>
);

export default App;
