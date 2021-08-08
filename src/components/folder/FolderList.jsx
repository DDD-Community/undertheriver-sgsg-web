import React, { useEffect, useRef, useState } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Folder from '@/components/folder/Folder';
import ArrowDown from '@/assets/img/arrow-down.svg';
import ArrowUp from '@/assets/img/arrow-up.svg';
import LockIcon from '@/assets/img/icon-lock.svg';
import FolderSortMenu from '@/components/folder/FolderSortMenu';
import { useFolderListContext } from '@/contexts/FolderListContext';

const folderListWrapper = css`
  .menu-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.375rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    .square-wrapper {
      display: inherit;
    }

    .menu-square {
      display: inherit;
      width: 1.5rem;
      height: 1.5rem;
      padding-top: 0.375rem;
      border: 2px solid #888888;
      border-radius: 0.125rem;
    }

    .square-line {
      padding-top: 0.5rem;
      width: 0.625rem;
      border-radius: 1px;
      text-align: center;
      margin: auto;
      height: 0;
      border-top: 0.125rem solid #888888;
    }

    .menu-title {
      font-weight: bold;
      font-size: 1rem;
      line-height: 23px;
      margin-left: 1rem;
      color: #888888;
      user-select: none;
    }

    .sortable-menu {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .sortable-label {
      font-size: 0.875rem;
      line-height: 20px;
      padding-right: 0.625rem;
      user-select: none;
    }

    .sortable-arrow {
      padding: 0.5rem 0;
      user-select: none;
    }
  }

  .folder-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
    color: #3c3a37;
    font-size: 1rem;
    font-weight: bold;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    .folder-item {
      display: inherit;
      align-items: center;

      .label {
        width: 110px;
        margin-left: 0.75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &:hover {
      background: #ece9e3;
      border-radius: 4px;
    }

    &.current {
      background: #ece9e3;
      border-radius: 4px;
    }

    .lock-btn {
      cursor: pointer;
    }
  }
`;

function FolderList(props) {
  const { folderList } = useFolderListContext();
  const tempSortType = localStorage.getItem('sort_type');
  let tempSortLabel =
    tempSortType === 'NAME' ? '이름순' : tempSortType === 'CREATED_AT' ? '생성순' : '메모 개수순';
  const menu = [{ label: '이름순' }, { label: '생성순' }, { label: '메모 개수순' }];
  // const [folderList, setFolderList] = useState([]);
  const [orderType, setOrderType] = useState({
    flag: false,
    type: 'ASC',
  });
  const [sortLabel, setSortLabel] = useState(tempSortLabel ? tempSortLabel : '생성순');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);

  useEffect(() => {
    let sortType = '';
    switch (sortLabel) {
      case '이름순':
        sortType = 'NAME';
        break;
      case '생성순':
        sortType = 'CREATED_AT';
        break;
      case '메모 개수순':
        sortType = 'MEMO';
        break;
      default:
        sortType = 'CREATED_AT';
    }
    localStorage.setItem('sort_type', sortType);
    props.setSortType(sortType);
    setIsMenuOpen(false);
  }, [sortLabel]);

  useEffect(() => {
    if (props.folderList) {
      // setFolderList(props.folderList);
    }
  }, [props.folderList]);

  useEffect(() => {
    if (orderType.flag) {
      let tempList = folderList.reverse();
      // setFolderList(tempList);
    }
    setOrderType({ ...orderType, flag: false });
  }, [orderType.flag]);

  const onClickFolder = (title, id = null, length) => {
    // TODO 쿼리스트링 처리 수정 사항
    history.push({
      pathname: '/',
      search: `?folderId=${id}`,
    });

    props.setSelectedFolder({ title: title, id: id, length: length });
  };

  const renderFolderList = () => {
    let html = [];

    try {
      if (folderList.length === 0) {
        return html;
      }
      html.push(
        <li
          key={Math.random()}
          className={'folder-list' + (props.selectedFolder.title === '전체' ? ' current' : '')}
          onClick={() => onClickFolder('전체', null, props.allMemoLength)}
        >
          <div className="folder-item">
            <Folder color="black" /> <span className="label">전체</span>
          </div>
          <div className="count">{props.allMemoLength}</div>
        </li>,
      );

      folderList.map((d) => {
        html.push(
          <li
            key={d.id}
            className={'folder-list' + (props.selectedFolder.id === d.id ? ' current' : '')}
            onClick={() => onClickFolder(d.title, d.id, d.memoCount)}
          >
            <div className="folder-item">
              <Folder color={d.color} /> <span className="label">{d.title}</span>
            </div>
            {props.selectedFolder.id === d.id ? (
              <img className="lock-btn" src={LockIcon} />
            ) : (
              <div className="count">{d.memoCount}</div>
            )}
          </li>,
        );
      });
      return html;
    } catch (e) {
      return html;
    }
  };

  return (
    <section css={folderListWrapper}>
      <div className="menu-wrapper">
        <div className="square-wrapper">
          <div className="menu-square">
            <hr className="square-line" />
          </div>
          <span className="menu-title">사각박스</span>
        </div>
        <div className="sortable-menu" ref={sortMenuRef}>
          <p className="sortable-label" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {sortLabel}
          </p>
          <img
            className="sortable-arrow"
            src={orderType.type === 'ASC' ? ArrowDown : ArrowUp}
            onClick={() =>
              setOrderType({
                flag: !orderType.flag,
                type: orderType.type === 'ASC' ? 'DESC' : 'ASC',
              })
            }
          />
          {isMenuOpen && (
            <FolderSortMenu
              menu={menu}
              sortLabel={sortLabel}
              setSortLabel={setSortLabel}
              leftPosition={sortMenuRef.current.offsetLeft}
            />
          )}
        </div>
      </div>
      <ul>{renderFolderList()}</ul>
    </section>
  );
}

export default FolderList;
