import React, { useContext, useEffect } from 'react';
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
import Folder from '../Folder/Folder';
import { useModal } from '../../hooks/UseModal';

const ModalWrapper = css`
  max-width: 45rem;
  width: 45rem;
  height: 36.25rem;
  padding: 2rem;
  .header {
    display: inline-flex;
    .title {
      margin-left: 1rem;
      line-height: 36px;
      align-items: center;
      font-size: 1.5rem;
    }
  }
  .body {
    .divider {
      width: 100%;
      border-bottom: 1px solid #a5aab2;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
  }
  .footer {
    color: #858585;
    font-size: 1rem;
    line-height: 22px;
    .edit-btn {
      margin-right: 2.5rem;
    }
  }
`;

export default function CardModal() {
  const { isOpen, handleCloseModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent css={ModalWrapper}>
        <ModalHeader className="header">
          {/*<Folder color={memoFolderColor} />*/}
          {/*<span className="title">{memoFolderTitle}</span>*/}
        </ModalHeader>
        <ModalCloseButton mt={6} mr={6} />
        <ModalBody className="body">
          {/*<p>{memoDate}</p>*/}
          <hr className="divider" />
          {/*<p>{memoContent}</p>*/}
        </ModalBody>
        <ModalFooter className="footer">
          <button onClick={handleCloseModal} className="edit-btn">
            수정
          </button>
          <button onClick={handleCloseModal} className="close-btn">
            삭제
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
