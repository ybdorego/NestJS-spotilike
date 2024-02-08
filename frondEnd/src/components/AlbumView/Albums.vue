<template>
  <Header />
  <div class="library">
    <div class="card" v-for="album in albums" :key="album.id">
      <div class="card-name">{{ album.titre }}</div>
      <div class="card-name">{{ album.dateSortie }}</div>
      <div class="quote">
        <img :src="album.pochette" alt="Album Cover" height="80" width="80" />
      </div>
  
      <router-link tag="li" :to="'/albums/' + album._id"><a>Détail</a></router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from '../Header.vue'

export default {
  components: {
    Header,
  },
  data() {
    return {
      albums: []
    };
  },
  mounted() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      try {
        const response = await axios.get("http://localhost:3000/album");
        this.albums = response.data;
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    },
  },
}




</script>
<style>
.library {
  margin-left: 240px;
}

.card {
  width: 190px;
  height: 264px;
  background: rgb(183, 226, 25);
  font-family: inherit;
  position: relative;
  border-radius: 8px;
}

.quote {
  color: rgb(223, 248, 134);
  padding-left: 30px;
  position: relative;
}

.card-name {
  text-transform: uppercase;
  font-weight: 700;
  color: rgb(127, 155, 29);
  padding: 35px;
  line-height: 23px;
}

.body-text {
  font-size: 20px;
  font-weight: 900;
  padding: 60px 40px 0;
  color: #465512;
  position: absolute;
  top: 40px;
  left: 1px;
  line-height: 23px;
}

.author {
  margin-top: 5px;
  opacity: 0;
  transition: 0.5s;
}

.card:hover .author {
  opacity: 1;
}

.pic {
  width: 50px;
  height: 50px;
  background-color: rgb(158, 196, 21);
  border-radius: 50%;
}

.author-container {
  display: flex;
  align-items: center;
}

.author {
  font-weight: 700;
  color: rgb(127, 155, 29);
  padding-left: 30px;
}

.card .author svg {
  display: inline;
  font-size: 12px;
  color: rgba(128, 155, 29, 0.452);
}</style>