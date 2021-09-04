import axios from 'axios';
import { createBrowserHistory } from 'history';
import apiAxios from 'axios';

//TODO: 임시 추가
apiAxios.defaults.baseURL = process.env.REACT_APP_API_URL;

const history = createBrowserHistory();

function getAccessTokenHeader() {
  const auth = 'Bearer' + ` ` + localStorage.getItem('access_token');
  return { headers: { Authorization: auth } };
}

function successStatusCheck(response: any, resolve: any) {
  if (response.status === 200) {
    resolve(response);
  } else if (response.status === 401) {
    moveLogin();
  } else {
    resolve('error');
  }
}

function failStatusCheck(err: any, reject: any) {
  if (err.response && err.response.status === 401) {
    moveLogin();
  } else {
    reject(err);
  }
}

function moveLogin() {
  localStorage.removeItem('access_token');
  history.push('/login');
}

//## 로그아웃
export const authLogout = async () => {
  try {
    await apiAxios.delete('/auth/logout', getAccessTokenHeader());
  } catch (e) {
    moveLogin();
  }
};

//## 폴더 조회
export const listFolder = async (orderBy: string) => {
  return await apiAxios.get(`/folders?orderBy=${orderBy}`, getAccessTokenHeader());
};

//## 폴더 생성
export const createFolder = async (data: any) => {
  return await apiAxios.post('/folders', data, getAccessTokenHeader());
};

//## 폴더 삭제
export const deleteFolder = async (folderId: number) => {
  return await apiAxios.delete(`/folders/${folderId}`, getAccessTokenHeader());
};

//## 폴더 이름 수정
export const updateFolder = async (folderId: number, title: string) => {
  return await apiAxios.put(`/folders/${folderId}/${title}`, getAccessTokenHeader());
};

//## 다음 폴더 색상 조회
export const checkFolderColor = async () => {
  return await apiAxios.get('/folders/color', getAccessTokenHeader());
};

export const listMemo = async (data: any) => {
  if (data.folderId) {
    return await apiAxios.get(`/memos?folderId=${data.folderId}`, getAccessTokenHeader());
  } else {
    return await apiAxios.get(`/memos`, getAccessTokenHeader());
  }
};

//## 메모 생성
//TODO: data 타입 지정
export const createMemo = async (data: any) => {
  return await apiAxios.post('/memos', data, getAccessTokenHeader());
};

export const deleteMemo = async (memoId: number) => {
  return await apiAxios.delete(`memos/${memoId}`, getAccessTokenHeader());
};

export const updateMemo = async (memoId: number, data: any) => {
  return await apiAxios.put(`memos/${memoId}`, data, getAccessTokenHeader());
};

//## 회원 조회
//TODO: 함수 작성할 때, 동사를 먼저 쓰기! getUserInfo 이런 식으로.
export const userInfo = async () => {
  try {
    return await apiAxios.get('/users/me', getAccessTokenHeader());
  } catch (e) {
    moveLogin();
  }
};

export default {
  authLogout,
  listFolder,
  createFolder,
  deleteFolder,
  updateFolder,
  checkFolderColor,
  listMemo,
  createMemo,
  userInfo,
};
