<template>
  <!-- ... -->
  <form name="form" @submit.prevent="handleLogin">
    <!-- ... -->
    <div class="container">
      <label for="email"><b>E-mail : </b></label>
      <input v-model="user.email" name="email" type="text" class="form-control" />
      <!-- ... -->

      <label for="password"><b>Password : </b></label>
      <input v-model="user.password" name="password" type="password" class="form-control" />
      <!-- ... -->

      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Login</span>
      </button>
    </div>
    <!-- ... -->
  </form>
  <!-- ... -->
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from 'axios'; // Import axios

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!").email("Must be a valid email"),
      password: yup.string().required("Password is required!"),
    });

    return {
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
  methods: {
    handleLogin() {
      this.loading = true;
      axios.post('http://localhost:3000/auth/api/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.$router.push({ name: 'home' }); // Redirige vers la page d'accueil en cas de succès
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
    }
  }
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

