import axios from 'axios';
import { createHashHistory } from 'history';

const history = createHashHistory();

const apiPrefix = process.env.REACT_APP_API_URL;

function baseApi(apiUrl?: string) {
  return axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

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

//## 폴더 조회
export function checkFolder(orderBy: string) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .get('/folders' + '?' + 'orderBy=' + orderBy, getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 폴더 생성
export function createFolder(data: any) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .post('/folders', data, getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 폴더 삭제
export function deleteFolder(folderId: number) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .delete('/folders' + `/${folderId}`, getAccessTokenHeader())
      .then((response) => {
        successStatusCheck(response, resolve);
      })
      .catch((err) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 폴더 이름 수정
export function updateFolder(folderId: number, title: string) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .put('/folders' + `/${folderId}` + `/${title}`, getAccessTokenHeader())
      .then((response) => {
        successStatusCheck(response, resolve);
      })
      .catch((err) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 다음 폴더 색상 조회
export function checkFolderColor() {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .get('/folders', getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

export function listMemo() {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .get('/memos', getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

export default {
  checkFolder,
  createFolder,
  deleteFolder,
  updateFolder,
  checkFolderColor,
};
