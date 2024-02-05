import axios from 'axios';

const API_URL_SigIn = 'http://localhost:3000/auth/api/login';
const API_URL_SiginUP = 'http://localhost:3000/auth/api/signup';
class AuthService {
  login(user) {
    return axios
      .post(API_URL_SigIn , {
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
    return axios.post(API_URL_SiginUP , {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();

