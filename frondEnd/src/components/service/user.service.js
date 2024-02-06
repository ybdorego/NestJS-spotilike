import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000';

class UserService {
   getHome() {
        return axios.get(API_URL);
    }
    getUserBoard() {
       return axios.get(API_URL , { headers: authHeader() });
    }
    getArtist() {
      return axios.get(API_URL , { headers: authHeader() });
   }
   getAlbums() {
      return axios.get(API_URL , { headers: authHeader() });
   }
}

export default new UserService();

