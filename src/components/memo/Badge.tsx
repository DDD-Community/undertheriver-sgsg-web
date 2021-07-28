import React from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const badgeWrapper = css`
  z-index: 5;
  width: 20px;
  height: 20px;
  background-color: #2da5d7;
  border-radius: 4px;
  transform: rotate(45deg);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

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

interface Badge {
  color: string;
  className?: string;
}
function Badge(props: Badge) {
  return <div css={badgeWrapper} className={props.color} />;
}

export default Badge;
