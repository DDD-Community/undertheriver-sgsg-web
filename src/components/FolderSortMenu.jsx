import React from 'react';
import { Box } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const menuListItem = css`
  font-size: 1rem;
  font-width: 400;
  line-height: 22px;
  color: #3c3a37;
  padding: 0.75rem 1.5rem;

  &.disabled {
    background: rgba(60, 58, 55, 0.1);
  }

  &:first-of-type {
    margin-top: 0.75rem;
  }

  &:hover {
    background: rgba(60, 58, 55, 0.1);
  }
`;

const FolderSortMenu = ({ menu, sortLabel, setSortLabel, leftPosition }) => {
  const menuList = menu.map((d) => (
    <p
      key={d.label}
      css={menuListItem}
      className={sortLabel === d.label ? 'disabled' : ''}
      onClick={() => setSortLabel(d.label)}
    >
      {d.label}
    </p>
  ));
  return (
    <Box
      css={{
        position: 'absolute',
        width: '12.5rem',
        height: '10rem',
        background: 'white',
        boxShadow: '0px 10px 16px rgba(211, 207, 197, 0.7)',
        borderRadius: '4px',
        top: localStorage.getItem('search_bar') === 'true' ? '374px' : '270px',
        left: `${leftPosition - 130}px`,
        marginRight: '20px',
        zIndex: '18',
      }}
    >
      {menuList}
    </Box>
  );
};

export default FolderSortMenu;
