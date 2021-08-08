import { createContext, ReactNode, FunctionComponent, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { FolderModel } from '@/types';
import fetcher from '@/lib/fetcher';

export interface FolderListContextState {
  folderList: FolderModel[] | undefined;
}

export const FolderListContext = createContext<FolderListContextState>(
  {} as FolderListContextState,
);

interface FolderListContextProps {
  children: ReactNode;
  orderBy: string | undefined;
}

const baseURL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const FolderListProvider: FunctionComponent<FolderListContextProps> = ({
  children,
  orderBy,
}) => {
  const { data: folderList, error } = useSWR(`${baseURL}/folders?orderBy=${orderBy}`, fetcher);
  if (error) return console.error(error);
  useEffect(() => {
    if (!folderList) return;
  }, [folderList]);

  return (
    <>
      <FolderListContext.Provider
        value={{
          folderList,
        }}
      >
        {children}
      </FolderListContext.Provider>
    </>
  );
};

export const useFolderListContext = () => {
  const context = useContext(FolderListContext);

  if (!context || context === ({} as FolderListContextState)) {
    throw new Error('You need to wrap FolderListProvider.');
  }

  return context;
};
