import axios from 'axios';

const API_URL_SigIn = 'http://localhost:3000/auth/api/';

class AuthService {
  login(user) {
    console.log(user);
    return axios
      .get(API_URL_SigIn + 'login', {
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

  signUp(user) {
    return axios
      .post(API_URL_SigIn + 'signup', {
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
}

export default new AuthService();