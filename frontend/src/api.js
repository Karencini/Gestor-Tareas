import axios from "axios";

const API_URL = "http://localhost:5000"; // Asegúrate de que es la URL de tu backend

const api = axios.create({
  baseURL: 'http://localhost:5000',  // Asegúrate de que la URL del backend sea correcta
});
export default api;
