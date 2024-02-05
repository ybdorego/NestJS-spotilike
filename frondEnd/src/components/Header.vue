<template>
  <div>
    <!-- Navbar Component -->
    <ul>
      <li style="float:right">
        <div class="user-dropdown">
          <span>
            <img width="50" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="icon"/>
            <!--{{currentUser.email}} -->
          </span>
          <div class="dropdown-content">
            <router-link to="/profile">Profile</router-link>
            <a @click="logout" href="#">Logout</a>
          </div>
        </div>
      </li>
    </ul>

    <!-- Sidebar Component -->
    <div class="sidenav">
      <router-link to="/home">
        <img width="125" src="https://i.pinimg.com/736x/5b/10/d7/5b10d7bb342b7eb3bc143d1faf39e8f5.jpg" alt="Logo">
      </router-link>
      <router-link to="/artiste">
        <a >Artiste</a>
      </router-link>
      <router-link to="/albums">
        <a >albums</a>
      </router-link>
      <router-link to="/">
        <a>Genres</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      
    };
  },
 /* computed: {
    currentUser() {
      return this.$store.state.auth.user ? this.$store.state.auth.user.email : '';
    },
  },
  methods: {
    logout() {
      
      console.log("Logout clicked");
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  },*/
};
</script>

<style scoped>
/* ... your existing styles ... */

.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #020202;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 6px 6px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  top: 50px;
}

.sidenav a:hover {
  color: #f1f1f1;
}

/* Main content area */
.main {
  margin-left: 200px;
  background-color: black;
  /* Same as the width of the sidenav */
}

/* Media query for small screens */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
    top: 30px;
  }
}

/* Navbar styles */
ul {
  list-style-type: none;
  margin: 0;
  padding:3px;
  overflow: hidden;
  background-color: black;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04AA6D;
}
/* Additional styles for dynamic username */
.user-dropdown span {
  font-size: 30px;
  margin-right: 10px; /* Adjust margin as needed */
  color: white; /* Set color as needed */
  cursor: pointer;
}

.user-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
