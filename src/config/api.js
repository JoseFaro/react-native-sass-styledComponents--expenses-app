import axios from 'axios';
import { APP_API_URL } from '@env';

const apiInstance = axios.create({
   baseURL: APP_API_URL,
});

const getHeaders = (token) => {
   return {
      headers: getTokenHeaders(token),
   };
};

const getTokenHeaders = (token) => {
   return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
   };
};

export { apiInstance, getHeaders, getTokenHeaders };
