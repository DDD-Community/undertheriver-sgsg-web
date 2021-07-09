import React from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const squareLine = css`
  padding-top: 2rem;
  width: 0.8125rem;
  text-align: center;
  margin: auto;
  height: 0;
  border-top: 0.125rem solid white;
`;

const folderWrapper = css`
  //display: flex;
  //flex-direction: column;
`;

const headerWrapper = css`
  width: 2rem;
  height: 0.625rem;
  border-radius: 0.125rem;
  color: black;
  z-index: 10;
  position: absolute;
  &.BLUE {
    background-color: #2da5d7;
  }

  &.GREEN {
    background-color: #00a09b;
  }

  &.RED {
    background-color: #e64632;
  }

  &.ORANGE {
    background-color: #f99a42;
  }

  &.PURPLE {
    background-color: #9f69db;
  }
`;

const boxWrapper = css`
  width: 1.75rem;
  height: 2rem;
  //margin-top: -0.5rem;
  margin-left: 0.125rem;
  padding-top: 0.75rem;
  border-radius: 0.125rem;
  background-color: #6b6862;
  &.BLUE {
    background-color: #7ec0dc;
  }

  &.GREEN {
    background-color: #74b9b7;
  }

  &.RED {
    background-color: #de8d83;
  }

  &.ORANGE {
    background-color: #f5bd89;
  }

  &.PURPLE {
    background-color: #bb9adf;
  }
`;

function Folder({ color }: { color: string }) {
  return (
    <div css={folderWrapper}>
      <div css={headerWrapper} className={color}></div>
      <div css={boxWrapper} className={color}>
        <hr css={squareLine} />
      </div>
    </div>
  );
}
export default Folder;
