import axios from 'axios';

function getAccessTokenHeader() {
  const auth = 'Bearer' + ` ` + localStorage.getItem('access_token');
  return { headers: { Authorization: auth } };
}

const fetcher = async (url: string) => {
  const response = await axios.get(url, getAccessTokenHeader());
  return response.data.response;
};

export default fetcher;
