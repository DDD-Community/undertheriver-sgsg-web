import Memo from '@/components/memo/Memo';
import React from 'react';
import { useMemoListContext } from '@/contexts/MemoListContext';
import MemoModal from '@/components/common/Modal';

function MemoList() {
  const { memoList } = useMemoListContext();

  return (
    <>
      {memoList?.map((d) => (
        <Memo
          key={d.memoId}
          folderId={d.folderId}
          folderColor={d.folderColor}
          createdAt={d.createdAt}
          memoContent={d.memoContent}
          folderTitle={d.folderTitle}
        />
      ))}
      <MemoModal />
    </>
  );
}

export default MemoList;
