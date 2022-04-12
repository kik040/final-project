import Axios from 'axios';
const cors = require('cors');


export const client = Axios.create({
    baseURL: 'http://localhost:4000',
    validateStatus:() => true,
  });

export const getRecords = async() => {
    const response = await client.get('/users/me/records');
    return response;
}


