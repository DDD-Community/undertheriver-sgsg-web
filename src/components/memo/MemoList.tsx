import Memo from '@/components/memo/Memo';
import Modal from '@/components/common/Modal';
import React from 'react';
import { useMemoListContext } from '@/contexts/MemoListContext';

function MemoList() {
  const { memoList } = useMemoListContext();

  return (
    <div>
      {memoList?.map((d) => (
        <Memo
          key={d.folderId}
          folderId={d.folderId}
          folderColor={d.folderColor}
          createdAt={d.createdAt}
          memoContent={d.memoContent}
          folderTitle={d.folderTitle}
        />
      ))}
      <Modal />
    </div>
  );
}

export default MemoList;
