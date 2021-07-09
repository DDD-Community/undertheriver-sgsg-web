import React, { useEffect } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import PasswordInput from '@/components/Password/PasswordInput';
import { useModal } from '@/hooks/UseModal';

const ModalWrapper = css`
  max-width: 37.5rem;
  width: 37.5rem;
  height: 26.25rem;
  padding: 2rem;
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 35px;
      margin-bottom: 5.625rem;
    }
  }
  .edit-btn {
    margin-top: 4.75rem;
    align-self: center;
    color: #a5aab2;
    text-decoration: underline;
  }
`;

export default function PasswordInputModal() {
  const { isOpen, handleCloseModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent css={ModalWrapper}>
        <ModalHeader className="header"></ModalHeader>
        <ModalCloseButton mt={6} mr={6} />
        <ModalBody className="body">
          <h3 className="title">현재 비밀번호를 입력해주세요</h3>
          <PasswordInput />
          <button onClick={handleCloseModal} className="edit-btn">
            비밀번호를 잊어버렸어요! 😭
          </button>
        </ModalBody>
        <ModalFooter className="footer"></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
