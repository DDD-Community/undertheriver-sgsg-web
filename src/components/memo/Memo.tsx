import React, { useEffect, useRef, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Tag from '@/components/memo/Tag';
import Modal from '@/components/common/Modal';
import MemoMenu from '@/components/memo/MemoMenu';
import Badge from '@/components/memo/Badge';
import MoreBtn from '@/assets/img/more.svg';
import { useModal } from '@/hooks/UseModal';
import useMenu from '@/hooks/UseMenu';
import { MemoModel } from '@/types';

const memoWrapper = css`
  padding-top: 100%;
  box-sizing: border-box;
  position: relative;
  background: white;
  box-shadow: 0 8px 8px rgba(222, 218, 209, 0.5);
  border-radius: 2px;

  .content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0.375rem;
  }
`;

const innerMemoWrapper = css`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(165, 170, 178, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  padding-top: 100%;
`;
const headerSection = css`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;

  .date {
    font-family: 'Black Han Sans', sans-serif;
    font-size: 0.875rem;
    color: #888888;
    line-height: 17px;
    align-self: center;
  }

  .badge {
    align-self: center;
  }

  .menu-btn {
    align-self: center;
  }
`;

const bodySection = css`
  height: calc(100% - 4.5rem);
  padding-left: 1rem;
`;

const tagSection = css`
  height: 1.5rem;
  margin-top: -1rem;
`;

const menu = [
  { label: '메모 잠그기' },
  { label: '즐겨찾기 해제' },
  { label: '수정하기' },
  { label: '삭제하기' },
];

function Memo(memo: Partial<MemoModel>) {
  const { onOpenMenu, isMenuOpen, onCloseMenu } = useMenu();
  const { handleOpenModal } = useModal();
  const wrapperRef = useRef(null);
  onCloseMenu(wrapperRef);

  return (
    <>
      <Box css={memoWrapper}>
        <div className="content">
          <div css={innerMemoWrapper}>
            <div className="content">
              <div css={headerSection}>
                <span className="date">{memo.createdAt}</span>
                {memo.createdAt && (
                  <Badge color={memo.folderColor ? memo.folderColor : 'red'} className="badge" />
                )}
                <span
                  className="menu-btn"
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onOpenMenu(e)}
                >
                  <img src={MoreBtn} />
                </span>
              </div>
              {isMenuOpen && (
                <div ref={wrapperRef}>
                  <MemoMenu menu={menu} />
                </div>
              )}
              <div css={bodySection} onClick={() => handleOpenModal(memo)}>
                {memo.memoContent}
              </div>
              <div css={tagSection} onClick={() => handleOpenModal(memo)}>
                <Tag
                  color={memo.folderColor ? memo.folderColor : 'red'}
                  text={memo.folderTitle ? memo.folderTitle : ''}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Memo;
