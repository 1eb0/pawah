import axios from 'axios';

const TOKEN_URL = 'https://your-auth-provider.com/token';
let currentToken = null;

export const fetchToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, {
      // Add your token request body here
    });
    currentToken = response.data.access_token;
    return currentToken;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const getToken = async () => {
  if (!currentToken) {
    return await fetchToken();
  }
  return currentToken;
};

export const refreshToken = async () => {
  try {
    currentToken = await fetchToken();
    return currentToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
