const axios = require('axios');
require('dotenv').config()

const tokenUrl = process.env.SEVIMA_API_GET_TOKEN;
const clientId = process.env.SEVIMA_CLIENT_ID;
const clientSecret = process.env.SEVIMA_CLIENT_SECRET;

const fetchToken = async () => {
  try {
    const tokenResponse = await axios.post(tokenUrl, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error saat mengambil token:', error.message);
    throw error;
  }
};

module.exports = {
  fetchToken
};