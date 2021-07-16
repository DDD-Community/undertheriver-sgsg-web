import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from '@/types';
import { HOST_URL } from '@/config';

export const apiAxios = axios.create({ baseURL: HOST_URL });
