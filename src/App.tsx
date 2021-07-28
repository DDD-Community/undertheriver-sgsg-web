import React from 'react';
import Router from './router';
import { SWRConfig } from 'swr';
import { ModalProvider } from './contexts/ModalContext';
import { MemoListProvider } from '@/contexts/MemoListContext';

const App: React.FC = () => (
  <SWRConfig value={{ revalidateOnFocus: false }}>
    <MemoListProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </MemoListProvider>
  </SWRConfig>
);

export default App;
