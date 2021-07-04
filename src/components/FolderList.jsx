import React, { useEffect, useRef, useState } from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Folder from './Folder';
import ArrowDown from '../assets/img/arrow-down.svg';
import ArrowUp from '../assets/img/arrow-up.svg';
import FolderSortMenu from './FolderSortMenu';

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
  }
`;

function FolderList(props) {
  const tempSortType = localStorage.getItem('sort_type');
  let tempSortLabel =
    tempSortType === 'NAME' ? '이름순' : tempSortType === 'CREATED_AT' ? '생성순' : '메모 개수순';
  const menu = [{ label: '이름순' }, { label: '생성순' }, { label: '메모 개수순' }];

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
  }, [sortLabel]);

  const onClickFolder = (title, id = null) => {
    props.setSelectedFolder({ title: title, id: id });
  };

  const renderFolderList = () => {
    let html = [];

    try {
      if (props.folderList.length === 0) {
        return html;
      }
      html.push(
        <li key={Math.random()} className="folder-list" onClick={() => onClickFolder('전체')}>
          <div className="folder-item">
            <Folder color="black" /> <span className="label">전체</span>
          </div>
          <div className="count">{props.allMemoLength}</div>
        </li>,
      );

      props.folderList.map((d) => {
        html.push(
          <li key={d.id} className="folder-list" onClick={() => onClickFolder(d.title, d.id)}>
            <div className="folder-item">
              <Folder color={d.color} /> <span className="label">{d.title}</span>
            </div>
            <div className="count">{d.memoCount}</div>
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
        <div className="sortable-menu" ref={sortMenuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <p className="sortable-label">{sortLabel}</p>
          <img className="sortable-arrow" src={isMenuOpen ? ArrowUp : ArrowDown} />
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
