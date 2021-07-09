import React from 'react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const tagWrapper = css`
  border-radius: 0.125rem;
  padding: 0.125rem 0.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(45, 165, 215, 0.2);
  color: #2da5d7;
  max-width: 5rem;
  width: max-content;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.BLUE {
    background-color: rgba(45, 165, 215, 0.2);
    color: #2da5d7;
  }

  &.GREEN {
    background-color: rgba(0, 160, 155, 0.2);
    color: #00a09b;
  }

  &.RED {
    background-color: rgba(230, 70, 50, 0.2);
    color: #e64632;
  }

  &.ORANGE {
    background-color: rgba(249, 154, 66, 0.2);
    color: #f99a42;
  }

  &.PURPLE {
    background-color: rgba(159, 105, 219, 0.2);
    color: #9f69db;
  }
`;

function Tag(props: { color: string; text: string }) {
  return (
    <div css={tagWrapper} className={props.color}>
      {props.text}
    </div>
  );
}

export default Tag;
