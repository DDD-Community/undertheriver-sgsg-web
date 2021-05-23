import React, { useState, useEffect } from 'react';
import { Textarea, Button } from '@chakra-ui/react';
import TagInput from './TagInput';
import Api, { checkFolderColor } from '../api/api';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import CloseBtn from '../assets/img/closeBtn.svg';
import ErrorPopup from './ErrorPopup';

const textareaWrapper = css`
  padding: 3rem 1rem 0 1rem;
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

const inputWrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const saveButton = css`
  width: 5rem;
  height: 2.5rem;
  background-color: #3c3a37;
  color: #fff;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.375rem;

  &:hover {
    background-color: #3c3a37;
    opacity: 0.8;
  }
`;

const closeButton = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem;
  background-image: url(${CloseBtn});
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Popup = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [memo, setMemo] = useState({
    value: '',
    nextColor: '',
    rows: 6,
    minRows: 6,
    maxRows: 10,
  });
  const [selectKeyword, setSelectKeyword] = useState([]);
  const [errorPopup, setErrorPopup] = useState({
    active: '',
    content: '',
  });

  useEffect(() => {
    const tempColor = localStorage.getItem('next_color');
    if (!tempColor) {
      checkFolderColorApi();
    } else {
      setMemo({
        ...memo,
        nextColor: tempColor,
      });
    }
  }, []);

  // memo Textarea size control
  const memoChange = (event: any) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = memo.minRows;

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    if (currentRows >= memo.maxRows) {
      event.target.rows = memo.maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    //TODO URL contents Check

    setMemo({
      ...memo,
      value: event.target.value,
      rows: currentRows < memo.maxRows ? currentRows : memo.maxRows,
    });
  };

  const writePopupResult = (status: string) => {
    props.setWritePopup({
      ...props.writePopup,
      flag: false,
    });
    if (status === 'submit') {
      checkMemo();
    }
  };

  const checkMemo = () => {
    let content = '';
    if (memo.value === '') {
      content = '메모를 입력해주세요.';
    } else if (selectKeyword.length === 0) {
      content = '폴더를 선택해주세요.';
    }

    if (content !== '') {
      setErrorPopup({ active: 'active', content: content });
    } else {
      writeMemoApi();
    }
  };

  const checkfolderColor = () => {
    const nextColor = localStorage.getItem('next_color');
    const tempColorArr = ['BLUE', 'GREEN', 'RED', 'ORANGE', 'PURPLE'];

    if (nextColor) {
      const colorIndex = tempColorArr.indexOf(nextColor);
      if (colorIndex < 4) {
        localStorage.setItem('next_color', tempColorArr[colorIndex + 1]);
      } else {
        localStorage.setItem('next_color', tempColorArr[0]);
      }
    }
  };

  const checkFolderColorApi = () => {
    try {
      setLoading(true);
      Api.checkFolderColor()
        .then((response: any) => {
          setLoading(false);
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              setMemo({
                ...memo,
                nextColor: data.response.nextColor,
              });
              localStorage.setItem('next_color', data.response.nextColor);
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

  const writeMemoApi = () => {
    try {
      const obj = {
        memoContent: memo.value,
        folderColor: memo.nextColor,
        folderTitle: selectKeyword[0],
      };
      setLoading(true);
      Api.createMemo(obj)
        .then((response: any) => {
          setLoading(false);
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              checkfolderColor();
              // todo redirect main
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
      <aside
        css={{
          display: 'block',
          width: 400,
          minHeight: 280,
          maxHeight: 420,
          position: 'absolute',
          left: props.writePopup.flag ? props.writePopup.left : 0,
          top: props.writePopup.flag ? props.writePopup.top : 0,
          boxShadow: '0px 10px 16px rgba(211, 207, 197, 0.7)',
          borderRadius: 2,
          backgroundColor: '#fff',
          zIndex: 9,
        }}
      >
        <a css={closeButton} onClick={() => writePopupResult('close')}></a>
        <>
          <div css={textareaWrapper}>
            <Textarea
              css={textareaBox}
              placeholder="무엇이 떠오르세요?"
              focusBorderColor="none"
              rows={memo.rows}
              value={memo.value}
              onChange={memoChange}
            />
          </div>
          <div css={inputWrapper}>
            <TagInput
              color={memo.nextColor}
              selectKeyword={selectKeyword}
              setSelectKeyword={setSelectKeyword}
            />
            <Button css={saveButton} onClick={() => writePopupResult('submit')}>
              저장
            </Button>
          </div>
        </>
      </aside>
      <ErrorPopup
        active={errorPopup.active}
        content={errorPopup.content}
        setErrorPopup={setErrorPopup}
      />
    </>
  );
};

export default Popup;
