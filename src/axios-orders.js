import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ad905.firebaseio.com/'
});

export default instance;