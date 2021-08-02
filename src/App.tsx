import React from 'react';
import Router from './router';
import { SWRConfig } from 'swr';
import { ModalProvider } from './contexts/ModalContext';

const App: React.FC = () => (
  <SWRConfig value={{ revalidateOnFocus: false }}>
    <ModalProvider>
      <Router />
    </ModalProvider>
  </SWRConfig>
);

export default App;
