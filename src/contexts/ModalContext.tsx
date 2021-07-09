import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export const ModalContext = createContext({} as ModalContextProps);

interface ModalContextProps {
  isOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  // memoFolderColor: string;
  // memoFolderTitle: React.ReactNode;
  // memoDate: React.ReactNode;
  // memoContent: React.ReactNode;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleOpenModal() {
    onOpen();
  }

  function handleCloseModal() {
    onClose();
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
