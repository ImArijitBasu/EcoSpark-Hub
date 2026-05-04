import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Needed for Better Auth to pass session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

