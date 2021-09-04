import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { MemoModel } from '@/types';

export const ModalContext = createContext({} as ModalContextProps);

interface ModalContextProps {
  isOpen: boolean;
  handleOpenModal: (args: Partial<MemoModel>) => void;
  handleCloseModal: () => void;
  currentModalData: Partial<MemoModel>;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentModalData, setCurrentModalData] = useState({});

  function handleCloseModal() {
    onClose();
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        handleOpenModal(args) {
          onOpen();
          setCurrentModalData(args);
        },
        handleCloseModal,
        currentModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
