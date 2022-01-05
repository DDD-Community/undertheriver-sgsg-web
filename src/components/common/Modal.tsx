import React, { useState, useEffect, useRef } from 'react';
import {
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
import LinkIcon from '@/assets/img/icon-link.svg';
import Folder from '@/components/folder/Folder';
import { useModal } from '@/hooks/useModal';
import Api from '@/api/api';

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

    .memo-content {
      height: 50%;
      line-height: 2rem;
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
  line-height: 2rem;
  border: none;
  resize: none;
  overflow-y: auto;

  &::placeholder {
    color: #a5aab2;
  }
`;

const linkBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.875rem;
  background: #f7f7f7;
  border-radius: 4px;

  .title {
    font-size: 1rem;
    color: #636972;
    margin-bottom: 0.5rem;
  }

  .url {
    font-size: 1rem;
    color: #a5aab2;
  }

  .link-btn {
    font-size: 1rem;
    color: #a5aab2;
    margin-right: 1.875rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
`;

const EditlinkBox = css`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 1.25rem 1.875rem;
  background: #f7f7f7;
  border-radius: 4px;

  .title {
    background: #f7f7f7;
    margin-left: 1rem;

    &:focus {
      border: none !important;
    }
  }


  .link-btn {
    cursor: pointer;
    color: #636972;
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

const defaultMsg = '일시적인 오류입니다. 잠시 후 다시 시도해주세요.';
export default function MemoModal() {
  const {
    isOpen,
    modalStatus,
    setModalStatus,
    memoChange,
    handleCloseModal,
    currentModalData,
  } = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  // const [urlEditFlag, setUrlEditFlag] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState({
    active: '',
    content: '',
  });
  const memoTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const editThumbnailUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalStatus === 'edit' && currentModalData.memoContent) {
      setContent(currentModalData.memoContent);
      if (currentModalData.thumbnailUrl) {
        setThumbnailUrl(currentModalData.thumbnailUrl);
      }
      setTimeout(() => {
        if (memoTextAreaRef.current) {
          memoTextAreaRef.current.selectionStart = memoTextAreaRef.current.value.length;
          memoTextAreaRef.current.focus();
        }
      }, 0);
    }
  }, [modalStatus]);

  const editThumbnailUrl = () => {
    // if (urlEditFlag) {
    // } else {
    setTimeout(() => {
      // setUrlEditFlag(true);
      if (editThumbnailUrlRef.current) {
        editThumbnailUrlRef.current.focus();
      }
    }, 0);
    // }
  };

  const handleUpdateBtn = () => {
    setModalStatus('edit');
    // setTimeout(() => {
    //   // setUrlEditFlag(true);
    //   if (editThumbnailUrlRef.current) {
    //     editThumbnailUrlRef.current.focus();
    //   }
    // }, 100);
  };

  const handleDeleteBtn = async () => {
    if (currentModalData.memoId)
      await Api.deleteMemo(currentModalData.memoId)
        .then((response: any) => {
          if (response.status === 200) {
            location.replace('');
          }
        })
        .catch((err) => {
          setErrorPopup({ active: 'active', content: defaultMsg });
        });
    await handleCloseModal();
  };

  const updateMemoApi = async () => {
    const params = {
      content: content,
      thumbnailUrl: thumbnailUrl,
      favorite: currentModalData.favorite,
      folderId: currentModalData.folderId,
    };
    if (currentModalData.memoId)
      await Api.updateMemo(currentModalData.memoId, params)
        .then((response: any) => {
          if (response.status === 200) {
            location.replace('');
          }
        })
        .catch((err) => {
          setErrorPopup({ active: 'active', content: defaultMsg });
        });
    await handleCloseModal();
  };

  const favoriteMemoApi = () => {
    if (!currentModalData.memoId) {
      return;
    }
    const api = currentModalData.favorite
      ? Api.unFavoriteMemo(currentModalData.memoId)
      : Api.favoriteMemo(currentModalData.memoId);
    try {
      setLoading(true);
      api
        .then((response: any) => {
          setLoading(false);
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              location.replace('');
            } else {
              setErrorPopup({ active: 'active', content: defaultMsg });
            }
          } else {
            setErrorPopup({ active: 'active', content: defaultMsg });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrorPopup({ active: 'active', content: defaultMsg });
        });
    } catch (e) {
      setLoading(false);
      setErrorPopup({ active: 'active', content: defaultMsg });
    }
  };

  return (
    <>
      {currentModalData && (
        <Modal css={{ overflowX: 'scroll' }} isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />
          <ModalContent css={ModalWrapper}>
            <ModalHeader className="header">
              <Folder color={currentModalData.folderColor ? currentModalData.folderColor : 'red'} />
              <span className="title">{currentModalData.folderTitle}</span>
            </ModalHeader>
            {modalStatus === 'readOnly' ? (
              <ModalCloseButton mt={6} mr={6} />
            ) : (
              <button className="favorite-btn" onClick={favoriteMemoApi}>
                {currentModalData.favorite ? '즐겨찾기 해제' : '즐겨찾기'}
              </button>
            )}
            <ModalBody className="body">
              <hr className="divider" />
              {modalStatus === 'readOnly' ? (
                <>
                  <p className="memo-date">{currentModalData.createdAt}</p>
                  <p className="memo-content">{currentModalData.memoContent}</p>
                </>
              ) : (
                <Textarea
                  css={textareaBox}
                  placeholder="무엇이 떠오르세요?"
                  focusBorderColor="none"
                  rows={8}
                  ref={memoTextAreaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              )}
              {modalStatus === 'readOnly' ? (
                currentModalData.thumbnailUrl && (
                  <div css={linkBox}>
                    <div>
                      <div className="title">{currentModalData.thumbnailTitle}</div>
                      <div className="url">{currentModalData.thumbnailUrl}</div>
                    </div>
                    <span
                      className="link-btn"
                      onClick={() => window.open(currentModalData.thumbnailUrl)}
                    >
                      바로가기
                    </span>
                  </div>
                )
              ) : (
                <div css={EditlinkBox}>
                  <img src={LinkIcon} />
                  <input
                    type="text"
                    className="title"
                    value={thumbnailUrl}
                    // disabled={!urlEditFlag}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    ref={editThumbnailUrlRef}
                  />
                  {/*<span className="link-btn" onClick={editThumbnailUrl}>*/}
                  {/*  확인*/}
                  {/*</span>*/}
                </div>
              )}
            </ModalBody>
            {modalStatus === 'readOnly' ? (
              <ModalFooter className="footer">
                <button onClick={handleUpdateBtn} className="edit-btn">
                  수정
                </button>
                <button onClick={handleDeleteBtn} className="close-btn">
                  삭제
                </button>
              </ModalFooter>
            ) : (
              <ModalFooter className="footer">
                <Button css={cancelButton} onClick={() => setModalStatus('readOnly')}>
                  취소
                </Button>
                <Button css={saveButton} onClick={() => updateMemoApi()}>
                  저장
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
