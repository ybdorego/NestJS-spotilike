<template>
  <div class="container">
    <form @submit.prevent="handleRegister" :validation-schema="schema">
    

        <div class="imgcontainer">
          <img
            src="https://static.vecteezy.com/ti/vecteur-libre/p1/8385659-spotify-social-media-icon-logo-abstract-symbol-illustration-gratuit-vectoriel.jpg"
            alt="Avatar" class="avatar" />
        </div>
        <div class="titre">
          <h1>Inscription</h1>
        </div>
        <div class="container">
          <label for="nom"><b>Nom:</b></label>
          <Field name="nom" type="text" class="form-control" v-model="nom" />
          <ErrorMessage name="nom" class="error-feedback" />

          <label for="email"><b>E-mail :</b></label>
          <Field name="email" type="text" class="form-control"  v-model="email" />
          <ErrorMessage name="email" class="error-feedback" />

          <label for="password"><b>Password :</b></label>
          <Field name="password" type="password" class="form-control"  v-model="password"/>
          <ErrorMessage name="password" class="error-feedback" />

          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Inscription</span>
          </button>
        </div>
        <span class="psw">Vous avez un compte ? <router-link to="/">Connectez-vous</router-link></span>

    </form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthService from "../service/auth.service"; // Importez le service AuthService

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      nom: yup
        .string()
        .required("Nom is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      const user = { nom: this.nom, email: this.email, password: this.password };
      
      AuthService.signup(user)
        .then((data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/");
          
        })
        .catch((error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.titre {
  text-align: center;
  margin-right: 30%;
}

form {

  width: 60%;
  position: center;
  margin-left: 20%;
}

/* Full-width inputs */
input[type=text],
input[type=password] {
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
  margin: 8px 0;
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
}</style>