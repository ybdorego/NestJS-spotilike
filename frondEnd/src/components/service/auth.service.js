import axios from 'axios';



class AuthService {
  login(user) {
    console.log(user);
    return axios
      .post(' http://localhost:3000/auth/api/login', {
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

  signup(user) {
    return axios
      .post('http://localhost:3000/auth/api/signup', { // Correction de l'URL d'inscription
        nom: user.nom, // Ajout de l'attribut nom dans les données envoyées
        email: user.email,
        password: user.password
      })
      .then(response => {
        // Vérifiez si la réponse contient un token
        if (response.data.token) {
          // Stocker le token dans le stockage local
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      })
      .catch(error => {
        // En cas d'erreur, renvoyez l'erreur pour qu'elle soit traitée au niveau du composant Vue
        throw error;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();