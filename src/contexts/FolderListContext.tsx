import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';
import { FolderModel } from '@/types';
import fetcher from '@/lib/fetcher';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export interface FolderListContextState {
  folderList: FolderModel[] | undefined;
  selectedFolder: any | null;
  allMemoLength: number;
  changeFolderId: (folderId: number, folderTitle: string, count: number) => void;
}

export const FolderListContext = createContext<FolderListContextState>(
  {} as FolderListContextState,
);

interface FolderListContextProps {
  children: ReactNode;
  orderBy: string | null;
}

const baseURL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const FolderListProvider: FunctionComponent<FolderListContextProps> = ({
  children,
  orderBy,
}) => {
  const [selectedFolder, setSelectedFolder] = useState({
    id: null,
    title: '전체',
    count: 0,
  });
  const [allMemoLength, setAllMemoLength] = useState(0);
  const { data: folderList, error, mutate } = useSWR(
    `${baseURL}/folders?orderBy=${orderBy}`,
    fetcher,
  );
  if (error) return console.error(error);
  useEffect(() => {
    if (!folderList) return;
    let memoLength = 0;
    folderList.map((d: any) => {
      memoLength = memoLength + d.memoCount;
    });
    setAllMemoLength(memoLength);
  }, [folderList]);

  useEffect(() => {
    //TODO 쿼리스트링 처리 확인
    const location = history.location;
    // console.log(location);
  }, [selectedFolder]);

  const changeFolderId = (folderId: any, folderTitle: string, count: number) => {
    if (!folderId) {
      folderList.map((d: any) => {
        count += d.memoCount;
      });
    }
    setSelectedFolder({
      id: folderId,
      title: folderTitle,
      count: count,
    });
  };

  return (
    <>
      <FolderListContext.Provider
        value={{
          folderList,
          selectedFolder,
          allMemoLength,
          changeFolderId,
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
