import axios from 'axios';
import { createHashHistory } from 'history';
import apiAxios from 'axios';

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

//## 로그아웃
export function authLogout() {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .delete('/auth/logout', getAccessTokenHeader())
      .then((response) => {
        successStatusCheck(response, resolve);
      })
      .catch((err) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 폴더 조회
export const checkFolder = async (orderBy: string) => {
  return await apiAxios.get(`/folders?orderBy${orderBy}`, getAccessTokenHeader());
};

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
      .get('/folders/color', getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

export function listMemo(data: any) {
  if (data.folderId) {
    return new Promise((resolve, reject) => {
      return baseApi(apiPrefix)
        .get('/memos' + '?' + 'folderId=' + data.folderId, getAccessTokenHeader())
        .then((response: any) => {
          successStatusCheck(response, resolve);
        })
        .catch((err: any) => {
          failStatusCheck(err, reject);
        });
    });
  } else {
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
}

//## 메모 생성
export function createMemo(data: any) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .post('/memos', data, getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

//## 회원 조회
export function userInfo() {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .get('/users/me', getAccessTokenHeader())
      .then((response: any) => {
        successStatusCheck(response, resolve);
      })
      .catch((err: any) => {
        failStatusCheck(err, reject);
      });
  });
}

export default {
  authLogout,
  checkFolder,
  createFolder,
  deleteFolder,
  updateFolder,
  checkFolderColor,
  listMemo,
  createMemo,
  userInfo,
};
