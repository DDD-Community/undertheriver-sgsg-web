import Memo from '@/components/memo/Memo';
import React from 'react';
import { useMemoListContext } from '@/contexts/MemoListContext';
import MemoModal from '@/components/common/Modal';

function MemoList({ setErrorPopup }: any) {
  const { memoList } = useMemoListContext();

  return (
    <>
      {memoList?.map((d) => (
        <Memo
          key={d.memoId}
          folderId={d.folderId}
          folderColor={d.folderColor}
          createdAt={d.createdAt}
          favorite={d.favorite}
          memoContent={d.memoContent}
          folderTitle={d.folderTitle}
          thumbnailTitle={d.thumbnailTitle}
          thumbnailUrl={d.thumbnailUrl}
          memoId={d.memoId}
          setErrorPopup={setErrorPopup}
        />
      ))}
      <MemoModal />
    </>
  );
}

export default MemoList;
