import React, { useState, useEffect } from 'react';
import { Input, Badge } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import CloseTag from '../assets/img/closeTag.svg';

const inputBox = css`
  width: 16.875rem;
  height: 2.5rem;
  margin-right: 1rem;
  background: #f7f7f7;
  color: #3c3a37;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.188rem;
  border: none;

  &::placeholder {
    color: #858585;
    opacity: 0.4;
  }

  &.active {
    caret-color: #f7f7f7;
    padding-left: 6.25rem;
  }
`;

const keywordTag = css`
  display: none;
  height: 1.5rem;
  padding: 0.125rem 0.5rem;
  position: absolute;
  top: 0.5rem;
  left: 0.813rem;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 2px;
  cursor: pointer;
  z-index: 99;

  &.active {
    display: block;
  }

  &.BLUE {
    color: #2da5d7;
    background-color: rgba(45, 165, 215, 0.2);
  }

  &.GREEN {
    color: #00a09b;
    background-color: rgba(0, 160, 155, 0.2);
  }

  &.ORANGE {
    color: #f99a42;
    background-color: rgba(249, 154, 66, 0.2);
  }

  &.PURPLE {
    color: #9f69db;
    background-color: rgba(159, 105, 219, 0.2);
  }

  &.RED {
    color: #e64632;
    background-color: rgba(230, 70, 50, 0.2);
  }
`;
const selectBox = css`
  width: 15.5rem;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  margin-top: 0.5rem;
  box-shadow: 4px 4px 16px rgba(211, 207, 197, 0.7);
`;
const selectListItem = css`
  padding: 0.563rem 0.5rem;
  cursor: pointer;

  &:hover {
    background: rgba(60, 58, 55, 0.1);
  }

  &.active {
    background: rgba(60, 58, 55, 0.1);
  }
`;

const closeTagBtn = css`
  display: inline-block;
  width: 0.688rem;
  margin-left: 0.5rem;
  padding-bottom: 0.188rem;
`;

function TagInput(props: any) {
  const [keyword, setKeyword] = useState('');
  const [folderListArr, setFolderListArr] = useState<any>([]);
  const [findFlag, setFindFlag] = useState(false);
  const [tagFlag, setTagFlag] = useState(false);
  const [selectPosition, setSelectPosition] = useState(0);

  useEffect(() => {
    const tempArr: any = [];
    props.folderList.map((item: any) => {
      tempArr.push(item.title);
    });
    setFolderListArr(tempArr);
  }, [props.folderList]);

  useEffect(() => {
    if (keyword !== '') {
      keywordFind();
    }
  }, [keyword]);

  // keyword input find words
  const keywordFind = () => {
    const tempKey: any = [];

    folderListArr.map((item: any) => {
      if (keyword === '') {
        return;
      } else if (item.includes(keyword)) {
        tempKey.push(item);
      }
      return item;
    });
    props.setSelectKeyword(tempKey);
  };

  // keyword input keypress event
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && keyword !== '') {
      if (props.selectKeyword.length > 0) {
        setFindFlag(true);
        setKeyword('');
      } else {
        props.setSelectKeyword([keyword]);
        setFindFlag(true);
        setKeyword('');
      }
    } else if (event.key === 'Backspace') {
      if (!tagFlag) {
        setTagFlag(true);
        return;
      }
      deleteTag();
    } else if (event.key === 'ArrowUp') {
      // top key press
      if (selectPosition > 0) {
        setSelectPosition(selectPosition - 1);
      }
    } else if (event.key === 'ArrowDown') {
      // down key press
      if (props.selectKeyword.length > selectPosition + 1) {
        setSelectPosition(selectPosition + 1);
      }
    }
  };

  // select List click keyword
  const handleSelectItem = () => {
    setFindFlag(true);
    setKeyword('');
  };

  // focus out keyword input
  const handleFocusOut = () => {
    if (keyword !== '' || keyword.length !== 0) {
      props.setSelectKeyword([keyword]);
      setFindFlag(true);
      setKeyword('');
    }
  };

  const deleteTag = () => {
    if (props.selectKeyword.length > 0 && tagFlag) {
      setFindFlag(false);
      props.setSelectKeyword([]);
      setTagFlag(false);
    }
  };

  const renderSelectList = () => {
    const html: any[] = [];

    props.selectKeyword.map((item: any, idx: number) => {
      html.push(
        <li
          css={selectListItem}
          className={selectPosition === idx ? 'active' : ''}
          key={idx}
          onClick={() => handleSelectItem()}
        >
          {item}
        </li>,
      );
    });
    return html;
  };

  return (
    <div css={{ position: 'relative' }} className="form-group">
      <Input
        css={inputBox}
        className={findFlag ? 'active' : ''}
        placeholder={findFlag ? '' : '저장할 폴더의 이름을 입력하세요'}
        focusBorderColor="black"
        autoComplete="off"
        value={keyword}
        onBlur={() => handleFocusOut()}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={findFlag ? undefined : (e) => setKeyword(e.target.value)}
      />
      <Badge
        css={keywordTag}
        id="keyword-tag"
        className={(findFlag ? 'active ' : '') + props.color}
        onClick={() => deleteTag()}
      >
        {props.selectKeyword[selectPosition]}
        {tagFlag && <img src={CloseTag} css={closeTagBtn} alt="Close Tag Button" />}
      </Badge>
      {!findFlag && props.selectKeyword.length > 0 && (
        <div css={selectBox}>
          <ul>{renderSelectList()}</ul>
        </div>
      )}
    </div>
  );
}

export default TagInput;
