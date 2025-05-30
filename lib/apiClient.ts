import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sampleTrending } from '@/data/sampleData';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const mock = new MockAdapter(apiClient, { delayResponse: 500 });
mock.onGet('/trending').reply(200, sampleTrending);

export default apiClient;
