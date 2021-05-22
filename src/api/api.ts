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

export function checkFolder(userId: string) {
  return new Promise((resolve, reject) => {
    return baseApi(apiPrefix)
      .get('/folders' + '/' + userId, getAccessTokenHeader())
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
};
