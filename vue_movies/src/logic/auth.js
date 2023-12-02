// VALIDACIÓN DEL USUARIO
// auth.js

import axios from 'axios';
import { API_AUTH, username, password } from './config';

// Función para autenticar y obtener tokens
async function authenticateAndGetTokens() {
  try {
    const response = await axios.post(`${API_AUTH}/users/token/`, {
      username,
      password,
    });
    const { access, refresh } = response.data;

    // Guardar tokens en el almacenamiento local (localStorage)
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    return { access, refresh };
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return null;
  }
}

// Función para refrescar el token de acceso
async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh_token');

  if (refresh) {
    try {
      const response = await axios.post(`${API_AUTH}/users/token/refresh/`, { refresh });
      const newAccessToken = response.data.access;

      // Actualizar el token de acceso en el almacenamiento local
      localStorage.setItem('access_token', newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error('Error al refrescar el token de acceso:', error);
      return null;
    }
  } else {
    return null;
  }
}

// Función para obtener el token de acceso
function getAccessToken() {
  return localStorage.getItem('access_token');
}

export { authenticateAndGetTokens, refreshAccessToken, getAccessToken };
