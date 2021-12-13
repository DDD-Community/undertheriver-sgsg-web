import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { MemoModel } from '@/types';

export const ModalContext = createContext({} as ModalContextProps);

interface ModalContextProps {
  isOpen: boolean;
  modalStatus: string;
  setModalStatus: (status: string) => void;
  memoChange: (content: string) => void;
  handleOpenModal: (args?: Partial<MemoModel>) => void;
  handleCloseModal: () => void;
  handleUpdateBtn: () => void;
  currentModalData: Partial<MemoModel>;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [modalStatus, setModalStatus] = useState<string>('readOnly');
  const [editModalContent, setEditModalContent] = useState('');
  const [currentModalData, setCurrentModalData] = useState<any>({});

  function handleCloseModal() {
    setModalStatus('readOnly');
    onClose();
  }

  function handleUpdateBtn() {
    setModalStatus('edit');
    // onClose();
  }

  function memoChange(content: string) {
    setEditModalContent(content);
    //todo : 수정사항
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalStatus,
        setModalStatus,
        memoChange,
        handleOpenModal(args) {
          onOpen();
          setCurrentModalData(args);
        },
        handleCloseModal,
        handleUpdateBtn,
        currentModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
