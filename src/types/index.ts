export interface MemoMenu {
  label: string;
}

export interface MemoModel {
  createdAt: string;
  favorite?: boolean;
  folderColor: string;
  folderId: number;
  folderTitle: string;
  memoContent: string;
  memoId?: number;
  secret?: boolean;
  thumbnailFaviconUrl?: string;
  thumbnailTitle?: string;
  thumbnailUrl?: string;
}

export interface FolderModel {
  color: string;
  id: number;
  memoCount: number;
  title: string;
}

interface _Error {
  message: string;
  status: number;
}

export interface Response<T> {
  error: _Error;
  response: Record<string, unknown>;
  success: boolean;
}