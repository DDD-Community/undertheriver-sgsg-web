import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Tag from '@/components/memo/Tag';
import MemoMenu from '@/components/memo/MemoMenu';
import Badge from '@/components/memo/Badge';
import MoreBtn from '@/assets/img/more.svg';
import { useModal } from '@/hooks/useModal';
import useMenu from '@/hooks/useMenu';
import { MemoModel } from '@/types';

const memoWrapper = css`
  padding-top: 100%;
  box-sizing: border-box;
  position: relative;
  background: white;
  box-shadow: 0 8px 8px rgba(222, 218, 209, 0.5);
  border-radius: 2px;

  &:hover {
    top: -10px;
  }

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
    cursor: pointer;
  }
`;

const bodySection = css`
  height: calc(100% - 4.5rem);
  padding-left: 1rem;

  .memo-content {
    height: 50%;
    padding-top: 0.75rem;
    padding-right: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .memo-link {
    width: 16.125rem;
    height: 3.25rem;
    background: #f7f7f7;
    border-radius: 2px;
    margin-top: 1.625rem;
    padding: 0.625rem 1rem;

    .title {
      font-size: 0.75rem;
      line-height: 1rem;
      color: #636972;
    }

    .url {
      font-size: 0.625rem;
      line-height: 0.875rem;
      color: #a5aab2;
    }
  }
`;

const tagSection = css`
  height: 1.5rem;
  margin-top: -1rem;
`;

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
                {memo.favorite && (
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
                  <MemoMenu
                    memo={memo}
                    favorite={memo.favorite ? memo.favorite : false}
                    setErrorPopup={memo.setErrorPopup}
                  />
                </div>
              )}
              <div css={bodySection} onClick={() => handleOpenModal(memo)}>
                <div className="memo-content">{memo.memoContent}</div>
                {memo.thumbnailUrl && (
                  <div className="memo-link">
                    <div className="title">{memo.thumbnailTitle}</div>
                    <div className="url">{memo.thumbnailUrl}</div>
                  </div>
                )}
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
