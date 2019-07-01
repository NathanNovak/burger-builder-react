import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-47ac9.firebaseio.com/'
});

export default instance;
