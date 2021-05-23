import React, { useState, useEffect, useRef } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GNB from '../components/GNB';
import Card from '../components/Card';
import Popup from '../components/Popup';
import NewMemoBtn from '../assets/img/newMemo.svg';
import FolderList from '../components/FolderList';
import Api, { userInfo } from '../api/api';
import ErrorPopup from '../components/ErrorPopup';

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
    padding-top: 5rem;
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
    grid-template-columns: repeat(auto-fit, minmax(302px, auto));
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const Main = () => {
  const [cards, setCards] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]);
  const cardList = cards.map((card) => (
    <li key={card.id}>
      <Card />
    </li>
  ));

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
  const buttonRef = useRef();

  useEffect(() => {
    userInfoApi();
  }, []);

  const memoWrite = () => {
    if (buttonRef.current !== null) {
      setWritePopup({
        flag: true,
        left: buttonRef.current.offsetLeft - 344,
        top: buttonRef.current.offsetTop + 72,
      });
    }
  };

  const userInfoApi = () => {
    try {
      setLoading(true);
      Api.userInfo()
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
              setErrorPopup({ active: 'active', content: '일시적인 오류입니다.' });
            }
          } else {
            setErrorPopup({ active: 'active', content: '일시적인 오류입니다.' });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrorPopup({ active: 'active', content: '일시적인 오류입니다.' });
        });
    } catch (e) {
      setLoading(false);
      setErrorPopup({ active: 'active', content: '일시적인 오류입니다.' });
    }
  };

  return (
    <>
      <GNB />
      <main css={pageWrapper}>
        <section className="content-wrapper">
          <aside className="aside-wrapper">
            <FolderList />
          </aside>
          <div className="right-section">
            <div className="header">
              <h2 className="folder-name">
                전체
                <span className="folder-count">{cardList.length}</span>
              </h2>
              <button onClick={() => memoWrite()} ref={buttonRef}>
                <figure>
                  <img src={NewMemoBtn} alt="Button too add new notes" />
                </figure>
              </button>
            </div>
            <article css={cardListWrapper}>
              <ul className="card-list">{cardList}</ul>
            </article>
          </div>
        </section>
      </main>
      {writePopup.flag && <Popup writePopup={writePopup} setWritePopup={setWritePopup} />}
      <ErrorPopup
        active={errorPopup.active}
        content={errorPopup.content}
        setErrorPopup={setErrorPopup}
      />
    </>
  );
};

export default Main;
