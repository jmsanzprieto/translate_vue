// LLAMADAs A LA API DE LAS PELÍCULAS
// api_moves.js

import axios from 'axios';
import { getAccessToken } from './auth'; // Importa la función para obtener el token de acceso
import { API_MOVIES } from './config';

// Obtener la lista de películas
async function getMovies() {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.get(`${API_MOVIES}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return null;
  }
}

// Obtener detalles de una película por ID
async function getMovieById(movieId) {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.get(`${API_MOVIES}/movies/${movieId}/`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
    return null;
  }
}

// Modificar una película
async function updateMovie(movieId, updatedMovieData) {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.put(`${API_MOVIES}${movieId}/`, updatedMovieData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al modificar detalles de la película:', error);
    return null;
  }
}


// Eliminar una película por ID
async function deleteMovieById(movieId) {
  console.log("La película a borrar es " + movieId);
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.delete(`${API_MOVIES}${movieId}/`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      
      if (response.status === 200) {
        return '¡La película se ha eliminado correctamente!';
      } else {
        return 'Error al eliminar la película';
      }
    } else {
      console.error('Token de acceso no disponible');
      return 'Token de acceso no disponible';
    }
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    return 'Error al eliminar la película';
  }
}

// Crear una nueva película
async function createMovie(newMovieData) {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.post(`${API_MOVIES}`, newMovieData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al crear la película:', error);
    return null;
  }
}

// Exporta todas las funciones
export { getMovies, getMovieById, updateMovie, deleteMovieById, createMovie };
