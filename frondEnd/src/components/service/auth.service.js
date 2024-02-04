import axios from 'axios';

const API_URL_SigIn = 'http://localhost:8000/api/';
const API_URL_SiginUP = 'http://localhost:8000/api/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL_SigIn + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL_SiginUP + 'signup', {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();

