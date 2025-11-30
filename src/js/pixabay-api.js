import axios from 'axios';

const API_KEY = '53374655-fbc0401583ed3cb1d1d3b0e8e';

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export async function searchImages(query, page = 1, perPage = 40) {
  try {
    const { data } = await api.get('', {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    const message =
      (error.response &&
        `HTTP error! status: ${error.response.status} ${
          error.response.statusText || ''
        }`.trim()) ||
      error.message ||
      'Unknown error';
    console.error('Error fetching images:', message);
    throw error;
  }
}
