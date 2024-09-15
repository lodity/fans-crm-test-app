import axios from 'axios';

// Создаем экземпляр axios
const httpClient = axios.create({
  baseURL: 'http://localhost:3000', // Подставь свой базовый URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
