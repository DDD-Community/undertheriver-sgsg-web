import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { MemoModel } from '@/types';
import { useModal } from '@/hooks/useModal';
import Api from '@/api/api';
import { useFolderListContext } from '@/contexts/FolderListContext';
import { mutate } from 'swr';

const baseURL = process.env.REACT_APP_API_URL;

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

interface MemoMenuProps {
  memo: Partial<MemoModel>;
  favorite: boolean;
  setErrorPopup: any;
}

const defaultMsg = '일시적인 오류입니다. 잠시 후 다시 시도해주세요.';

const MemoMenu = ({ memo, favorite, setErrorPopup }: MemoMenuProps) => {
  const { handleOpenModal } = useModal();
  const { selectedFolder } = useFolderListContext();
  const [menu] = useState([
    { label: '메모 잠그기', type: 'lock' },
    { label: '즐겨찾기', type: 'favorite' },
    { label: '수정하기', type: 'edit' },
    { label: '삭제하기', type: 'delete' },
  ]);
  const [loading, setLoading] = useState(false);

  const clickMenu = (e: any, type: string) => {
    e.stopPropagation();
    console.log(type, memo.memoId);

    if (type === 'favorite') {
      favoriteMemoApi();
    } else if (type === 'edit') {
      handleOpenModal(memo);
    } else if (type === 'delete') {
      return deleteMemo();
    }
  };

  const favoriteMemoApi = () => {
    if (!memo.memoId) {
      return;
    }
    const api = favorite ? Api.unFavoriteMemo(memo.memoId) : Api.favoriteMemo(memo.memoId);
    try {
      setLoading(true);
      api
        .then((response: any) => {
          setLoading(false);
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              mutate(
                `${baseURL}/memos${selectedFolder.id ? '?folderId=' + selectedFolder.id : ''}`,
              );
            } else {
              setErrorPopup({ active: 'active', content: defaultMsg });
            }
          } else {
            setErrorPopup({ active: 'active', content: defaultMsg });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrorPopup({ active: 'active', content: defaultMsg });
        });
    } catch (e) {
      setLoading(false);
      setErrorPopup({ active: 'active', content: defaultMsg });
    }
  };

  const deleteMemo = async () => {
    if (memo.memoId)
      await Api.deleteMemo(memo.memoId)
        .then((response: any) => {
          if (response.status === 200) {
            mutate(`${baseURL}/memos${selectedFolder.id ? '?folderId=' + selectedFolder.id : ''}`);
          }
        })
        .catch((err) => {
          setErrorPopup({ active: 'active', content: defaultMsg });
        });
  };

  const menuList = menu.map((d: any, idx: number) => (
    <p className="menu-list" key={idx}>
      <button onClick={(e) => clickMenu(e, d.type)} value={d.label}>
        {favorite && d.label === '즐겨찾기' ? d.label + ' 해제' : d.label}
      </button>
    </p>
  ));
  return <Box css={menuWrapper}>{menuList}</Box>;
};

export default MemoMenu;
