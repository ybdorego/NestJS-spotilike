<template>
  <div class="container">
    <form name="form" @submit.prevent="handleLogin" >
      <div class="imgcontainer">
        <img src="https://static.vecteezy.com/ti/vecteur-libre/p1/8385659-spotify-social-media-icon-logo-abstract-symbol-illustration-gratuit-vectoriel.jpg" alt="Avatar" class="avatar" />
      </div>
      <div class="titre">
        <h1>Connexion</h1>
      </div>
      <div class="container">
        <label for="email">E-mail : </label>
        <input v-model="email" name="email" type="text" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
        
        <label for="password"><b>Password : </b></label>
        <input v-model="password" name="password" type="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
        
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Login</span>
        </button>
      </div>
      <button type="button" class="cancelbtn">Cancel</button>
      <span class="psw">Créer votre compte <router-link to="/register">Inscription</router-link></span>
    </form>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import AuthService from "../service/auth.service";

export default {
  name: "Login",
  components: {
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      message: "",
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;

      const user = { email: this.email, password: this.password };

      AuthService.login(user)
        .then(() => {
          this.$router.push("/home");
        })
        console.log(user)
        .catch(error => {
          this.loading = false;
          this.message = error.response.data.message || error.message || error.toString();
        });
    },
  },
};
</script>

<style>
.titre{
  text-align: center;
  margin-right: 30%;
}

form {

  width: 60%;
  position: center;
  margin-left: 20%;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;

  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 50px;
  margin: 8px 0 ;
  border: none;
  cursor: pointer;
  top: 20px;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  margin-left: 1.4%;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 30px 0 30px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
  margin-right: 20px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}

</style>

