import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.88.23:8000/api/auth', // Remplacez <IP_DE_VOTRE_MACHINE> par l'adresse IP de votre machine
    headers: {
      'Content-Type': 'application/json',
    },
  });
export default api;
