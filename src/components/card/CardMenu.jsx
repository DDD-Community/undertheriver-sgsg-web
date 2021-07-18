import React from 'react';
import { Box } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const menuWrapper = css`
  position: absolute;
  width: 12.5rem;
  height: 13.75rem;
  background: white;
  box-shadow: 0px 10px 16px rgba(211, 207, 197, 0.7);
  border-radius: 4px;
  right: 0;
  margin-right: 20px;
  z-index: 10;
  padding: 1.5rem;
  .menu-list {
    margin-bottom: 1.75rem;
    font-size: 1rem;
    line-height: 22px;
    color: #3c3a37;
    &:last-child {
      color: #e64632;
    }
  }
`;

const CardMenu = ({ menu }) => {
  const clickMenu = (e) => {
    e.stopPropagation();
  };
  const menuList = menu.map((d) => (
    <p key={d.label} className="menu-list">
      <button onClick={clickMenu} value={d.label}>
        {' '}
        {d.label}
      </button>
    </p>
  ));
  return <Box css={menuWrapper}>{menuList}</Box>;
};

export default CardMenu;
