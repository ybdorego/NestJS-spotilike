<template>
  <div>
    <!-- Navbar Component -->
    <ul>
      <li style="float:right"><a class="active" href="#about">
        <img 
          class="rounded-full" 
          width="27"
          src="https://yt3.ggpht.com/e9o-24_frmNSSVvjS47rT8qCHgsHNiedqgXbzmrmpsj6H1ketcufR1B9vLXTZRa30krRksPj=s88-c-k-c0x00ffffff-no-rj-mo"
        >About</a></li>
    </ul>

    <!-- Sidebar Component -->
    <div class="sidenav">
      <router-link to="/home">
        <img width="125" src="https://i.pinimg.com/736x/5b/10/d7/5b10d7bb342b7eb3bc143d1faf39e8f5.jpg" alt="Logo">
      </router-link>
      <router-link to="/home">
        <a href="#">home</a>
      </router-link>
      <router-link to="/">
        <a href="#">home</a>
      </router-link>
      <router-link to="/">
        <a href="#">home</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openMenu: false,
    };
  },
};
</script>

<style>
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
  padding: 0;
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
</style>
