import axios from 'axios';
import {
  loadProgressBar
} from 'axios-progress-bar';

const AXIOS = axios.create({
  baseURL: 'http://localhost:18081',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

loadProgressBar(undefined, AXIOS);
export default AXIOS;