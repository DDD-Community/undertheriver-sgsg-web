import { createContext, ReactNode, FunctionComponent, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { MemoModel } from '@/types';
import fetcher from '@/lib/fetcher';

export interface MemoListContextState {
  memoList: MemoModel[] | undefined;
}

export const MemoListContext = createContext<MemoListContextState>({} as MemoListContextState);

interface MemoListProviderProps {
  children: ReactNode;
  folderId?: number | undefined;
}

const baseURL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const MemoListProvider: FunctionComponent<MemoListProviderProps> = ({
  children,
  folderId,
}) => {
  const { data: memoList, error } = useSWR(
    `${baseURL}/memos${folderId ? '?folderId=' + folderId : ''}`,
    fetcher,
  );
  if (error) return console.error(error);
  useEffect(() => {
    if (!memoList) return;
  }, [memoList]);
  console.log(memoList);

  return (
    <>
      <MemoListContext.Provider
        value={{
          memoList,
        }}
      >
        {children}
      </MemoListContext.Provider>
    </>
  );
};

export const useMemoListContext = () => {
  const context = useContext(MemoListContext);

  if (!context || context === ({} as MemoListContextState)) {
    throw new Error('You need to wrap MemoListProvider.');
  }

  return context;
};
