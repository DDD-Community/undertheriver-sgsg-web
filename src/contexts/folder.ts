import { createContext, useState } from 'react';

const FolderContext = createContext({
  state: { color: '', id: 0, memoCount: 0, title: '' },
  actions: {
    setColor: () => {},
  },
});
