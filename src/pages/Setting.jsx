import React, { useState, useEffect } from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Switch } from '@chakra-ui/react';
import GNB from '@/components/Common/GNB';
import GoogleIcon from '@/assets/img/icon-google.svg';
import PasswordInputModal from '@/components/Password/PasswordInputModal';
import { useModal } from '@/hooks/UseModal';

const pageWrapper = css`
  background: #f9f7f2;
  min-height: 100vh;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    height: 100vh;
    width: 62.5%;
    margin: auto;
    padding-top: 10.625rem;
    padding-bottom: 10vh;
  }

  .page-title {
    color: #3c3a37;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    user-select: none;
  }

  .list-wrapper {
    display: flex;
    justify-content: space-between;
    width: 50rem;
    height: 10rem;
    align-items: center;
    border-bottom: 1px solid rgba(165, 170, 178, 0.5);
  }

  .list-wrapper h4 {
    margin-bottom: 0.563rem;
    color: #3c3a37;
    font-size: 1rem;
    font-weight: 400;
    user-select: none;
  }

  .list-wrapper span {
    color: #3c3a37;
    opacity: 0.6;
    font-size: 1rem;
    font-weight: 400;
    user-select: none;
  }

  .setting-btn {
    padding: 0.313rem 1.5rem;
    color: #f7f7f7;
    font-size: 0.875rem;
    font-weight: 700;
    background: rgba(93, 101, 113, 0.3);
    border-radius: 0.25rem;
  }

  .logout-btn {
    align-self: flex-end;
    background: #a5aab2;
    border-radius: 3.75rem;
    width: 10rem;
    height: 3.5rem;
    padding: 1rem 3.125rem;
    margin-top: 2.75rem;
    color: white;
    font-weight: bold;
  }

  .email-account {
    width: 31.25rem;
    color: #5d6571;
    padding: 1rem 1rem 1rem 4rem;
    border-radius: 4px;
    background-color: #ffffff;
    background-image: url(${GoogleIcon});
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    background-position: left 1.188rem top 0.75rem;
  }
`;
const Setting = () => {
  const { handleOpenModal } = useModal();
  const [email] = useState(JSON.parse(localStorage.getItem('user')).email);
  const [isSearchBarCheck, setIsSearchBarCheck] = useState(false);
  const [isExtensionUse, setIsExtensionUse] = useState(false);

  useEffect(() => {
    setIsSearchBarCheck(localStorage.getItem('search_bar') === 'true');
    setIsExtensionUse(localStorage.getItem('use_extension') === 'true');
  }, []);

  const searchBarCheck = (flag) => {
    localStorage.setItem('search_bar', flag);
    setIsSearchBarCheck(flag);
  };

  const extensionCheck = (flag) => {
    localStorage.setItem('use_extension', flag);
    setIsExtensionUse(flag);
  };

  const userLogout = () => {
    localStorage.clear();
    if (process.env.NODE_ENV === 'production') window.location.href = 'https://sgsg.space/login';
    else window.location.href = 'http://localhost:3000/login';
  };

  return (
    <>
      <GNB />
      <section css={pageWrapper}>
        <div className="content-wrapper">
          <h3 className="page-title">설정</h3>
          <div className="list-wrapper">
            <h4>연동 이메일</h4>
            <div className="email-account">{email}</div>
          </div>
          <div className="list-wrapper">
            <div>
              <h4>메모 비밀번호 설정</h4>
              <span>현재 비밀번호가 설정되어있어요.</span>
            </div>
            <button className="setting-btn" onClick={handleOpenModal}>
              비밀번호 변경
            </button>
            <PasswordInputModal />
          </div>
          <div className="list-wrapper">
            <div>
              <h4>크롬 검색바 노출</h4>
              <span>메인 화면에서 검색바를 보여줄까요?</span>
            </div>
            <Switch
              size="lg"
              colorScheme="gray"
              isChecked={isSearchBarCheck}
              onChange={() => searchBarCheck(!isSearchBarCheck)}
            />
          </div>
          <div className="list-wrapper">
            <div>
              <h4>새 탭에서 시작</h4>
              <span>더 빠르게 사각사각 해볼까요?</span>
            </div>
            <Switch
              size="lg"
              colorScheme="gray"
              isChecked={isExtensionUse}
              onChange={() => extensionCheck(!isExtensionUse)}
            />
          </div>
          <button className="logout-btn" onClick={userLogout}>
            로그아웃
          </button>
        </div>
      </section>
    </>
  );
};

export default Setting;
