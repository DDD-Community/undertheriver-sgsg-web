import React, { useState, useEffect, useRef } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GNB from '@/components/common/GNB';
import Memo from '@/components/memo/Memo';
import Popup from '@/components/popup/Popup';
import NewMemoBtn from '@/assets/img/newMemo.svg';
import FolderList from '@/components/folder/FolderList';
import SearchBar from '@/components/common/SearchBar';
import Api from '@/api/api';
import ErrorPopup from '@/components/common/ErrorPopup';
import { useModal } from '@/hooks/UseModal';
import Modal from '@/components/common/Modal';
import MemoList from '@/components/memo/MemoList';
import { MemoListProvider } from '@/contexts/MemoListContext';
import { FolderListProvider, useFolderListContext } from '@/contexts/FolderListContext';
import { SWRConfig } from 'swr';

const pageWrapper = css`
  background: #f9f7f2;
  height: 100%;

  .content-wrapper {
    display: flex;
    max-width: 1280px;
    min-height: 100vh;
    height: 100%;
    margin: auto;
    justify-content: space-between;
    //padding-top: 5rem;
    padding-bottom: 13.75rem;
  }

  .aside-wrapper {
    min-width: 20%;
    height: 100%;
    margin-top: 9.5rem;
    flex-shrink: 0;
  }

  .right-section {
    flex-grow: 1;
    margin-top: 3.5rem;
    margin-left: 5%;

    .header {
      display: flex;
      justify-content: space-between;

      .folder-name {
        display: inline;
        color: #3c3a37;
        font-size: 2.5rem;
        line-height: 3.625rem;
        font-weight: bold;
        user-select: none;
      }

      .folder-count {
        display: inline;
        font-size: 2.5rem;
        line-height: 3.625rem;
        color: #3c3a37;
        margin-left: 1rem;
      }
    }
  }
`;

const cardListWrapper = css`
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(302px, 302px));
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const defaultMsg = '일시적인 오류입니다. 잠시 후 다시 시도해주세요.';

const Main = () => {
  const { selectedFolder, allMemoLength } = useFolderListContext();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    hasFolderPassword: false,
    name: '',
    profileImageUrl: '',
  });
  const [writePopup, setWritePopup] = useState({
    flag: false,
    left: 0,
    top: 0,
  });
  const [errorPopup, setErrorPopup] = useState({
    active: '',
    content: '',
  });
  const [sortType, setSortType] = useState(
    localStorage.getItem('sort_type') ? localStorage.getItem('sort_type') : 'CREATED_AT',
  );
  const [updateFlag, setUpdateFlag] = useState(false);
  const { handleOpenModal } = useModal();
  const [cards, setCards] = useState([
    {
      createdAt: '',
      favorite: false,
      folderColor: '',
      folderId: 0,
      folderTitle: '',
      memoContent: '',
      memoId: 0,
      thumbnailUrl: '',
    },
  ]);

  const [isSearchBar] = useState(localStorage.getItem('search_bar'));
  const buttonRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      userInfoApi();
    }
  }, []);

  const memoWrite = () => {
    setWritePopup({
      flag: true,
      left: buttonRef.current?.offsetLeft - 344,
      top: buttonRef.current?.offsetTop + 72,
    });
  };

  const userInfoApi = () => {
    try {
      setLoading(true);
      Api.getUserInfo()
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              setUser({
                ...user,
                email: data.response.email,
                hasFolderPassword: data.response.hasFolderPassword,
                name: data.response.name,
                profileImageUrl: data.response.profileImageUrl,
              });
              localStorage.setItem('user', JSON.stringify(data.response));
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
    <FolderListProvider orderBy={sortType}>
      <MemoListProvider>
        <GNB />
        <main css={pageWrapper}>
          {isSearchBar === 'true' && <SearchBar />}
          <section
            className="content-wrapper"
            css={{ paddingTop: isSearchBar === 'true' ? '1rem' : '5rem' }}
          >
            <aside className="aside-wrapper">
              <FolderList setSortType={setSortType} allMemoLength={allMemoLength} />
            </aside>
            <div className="right-section">
              <div className="header">
                <h2 className="folder-name">
                  {selectedFolder && selectedFolder.title ? selectedFolder.title : ''}
                  <span className="folder-count">
                    {selectedFolder && selectedFolder.count !== 0
                      ? selectedFolder.count
                      : allMemoLength}
                  </span>
                </h2>
                <button onClick={() => memoWrite()} ref={buttonRef}>
                  <figure>
                    <img src={NewMemoBtn} alt="Button too add new notes" />
                  </figure>
                </button>
              </div>
              <article css={cardListWrapper}>
                <ul className="card-list">
                  <MemoList setErrorPopup={setErrorPopup} />
                </ul>
              </article>
            </div>
          </section>
        </main>
        {writePopup.flag && (
          <Popup
            writePopup={writePopup}
            setWritePopup={setWritePopup}
            setUpdateFlag={setUpdateFlag}
          />
        )}
        <ErrorPopup
          active={errorPopup.active}
          content={errorPopup.content}
          setErrorPopup={setErrorPopup}
        />
      </MemoListProvider>
    </FolderListProvider>
  );
};
export default Main;
