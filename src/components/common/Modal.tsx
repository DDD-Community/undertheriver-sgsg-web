import React, { useState, useEffect, useContext } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Folder from '@/components/folder/Folder';
import { useModal } from '@/hooks/UseModal';
import { MemoModel } from '@/types';
import { deleteMemo, updateMemo } from '@/api/api';

const ModalWrapper = css`
  max-width: 45rem;
  width: 45rem;
  height: 36.25rem;
  padding: 1.5rem 2.5rem;

  .header {
    display: inline-flex;
    padding: 0;

    .title {
      margin-left: 1rem;
      line-height: 36px;
      align-items: center;
      font-size: 1.5rem;
    }
  }

  .edit-header {
    display: inline-flex;
    padding: 0;

    .memo-title-date {
      font-family: 'Black Han Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;
      color: #636972;
      margin-left: 1rem;
      line-height: 30px;
    }
  }

  .favorite-btn {
    position: absolute;
    top: 1.75rem;
    right: 2.5rem;
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    color: #a5aab2;
  }

  .body {
    padding: 0;

    .divider {
      width: 100%;
      border-bottom: 1px solid #a5aab2;
      margin-top: 1.5rem;
      opacity: 0.3;
      margin-bottom: 1.5rem;
    }

    .memo-date {
      font-family: 'Black Han Sans', sans-serif;
      font-size: 1rem;
      color: #636972;
      margin-bottom: 0.5rem;
    }
  }

  .footer {
    color: #858585;
    font-size: 1rem;
    line-height: 22px;
    padding: 0 0 0.5rem 0;

    .edit-btn {
      margin-right: 2.5rem;
    }
  }
`;

const textareaBox = css`
  height: auto;
  padding: 0.313rem 0 0 0.625rem;
  color: #3c3a37;
  font-size: 1rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1.6rem;
  border: none;
  resize: none;
  overflow-y: auto;

  &::placeholder {
    color: #a5aab2;
  }
`;

const saveButton = css`
  width: 7.5rem;
  height: 2.5rem;
  background-color: #3c3a37;
  color: #fff;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.375rem;
  border-radius: 4px;

  &:hover {
    background-color: #3c3a37;
    opacity: 0.8;
  }
`;

const cancelButton = css`
  width: 7.5rem;
  height: 2.5rem;
  background-color: #fff;
  color: #3c3a37;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.375rem;
  border-radius: 4px;
  border: 1px solid #a5aab2;
  margin-right: 1rem;

  &:hover {
    background-color: #3c3a37;
    color: #fff;
    opacity: 0.8;
  }
`;

export default function MemoModal() {
  const {
    isOpen,
    modalStatus,
    setModalStatus,
    memoChange,
    handleCloseModal,
    currentModalData,
    handleUpdateBtn,
  } = useModal();

  const handleDeleteBtn = async () => {
    if (currentModalData.memoId) await deleteMemo(currentModalData.memoId);
    await handleCloseModal();
  };

  // const handleUpdateBtn = async () => {
  //   // const testData = {
  //   //   content: 'string',
  //   //   favorite: true,
  //   //   folderId: 3,
  //   // };
  //   // if (currentModalData.memoId) await updateMemo(currentModalData.memoId, testData);
  //   // await handleCloseModal();
  // };

  return (
    <>
      {currentModalData && (
        <Modal css={{ overflowX: 'scroll' }} isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />
          {modalStatus === 'readOnly' ? (
            <ModalContent css={ModalWrapper}>
              <ModalHeader className="header">
                <Folder
                  color={currentModalData.folderColor ? currentModalData.folderColor : 'red'}
                />
                <span className="title">{currentModalData.folderTitle}</span>
              </ModalHeader>
              <ModalCloseButton mt={6} mr={6} />
              <ModalBody className="body">
                <hr className="divider" />
                <p className="memo-date">{currentModalData.createdAt}</p>
                <p className="memo-content">{currentModalData.memoContent}</p>
              </ModalBody>
              <ModalFooter className="footer">
                <button onClick={() => setModalStatus('edit')} className="edit-btn">
                  수정
                </button>
                <button onClick={handleDeleteBtn} className="close-btn">
                  삭제
                </button>
              </ModalFooter>
            </ModalContent>
          ) : (
            <ModalContent css={ModalWrapper}>
              <ModalHeader className="edit-header">
                <Folder
                  color={currentModalData.folderColor ? currentModalData.folderColor : 'red'}
                />
                <span className="memo-title-date">{currentModalData.createdAt}</span>
              </ModalHeader>
              <button className="favorite-btn">즐겨찾기</button>
              <ModalBody className="body">
                <hr className="divider" />
                <Textarea
                  css={textareaBox}
                  placeholder="무엇이 떠오르세요?"
                  focusBorderColor="none"
                  rows={8}
                  value={currentModalData.memoContent}
                  onChange={(e) => memoChange(e.target.value)}
                />
              </ModalBody>
              <ModalFooter className="footer">
                <Button css={cancelButton} onClick={() => setModalStatus('readOnly')}>
                  취소
                </Button>
                <Button css={saveButton} onClick={() => handleUpdateBtn()}>
                  저장
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Modal>
      )}
    </>
  );
}
