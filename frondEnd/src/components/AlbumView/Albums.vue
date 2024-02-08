<template>
  <Header />

  <h1>Les albumes disponibles</h1>
  <div class="library">
    <div class="row">
      <div class="card" v-for="album in albums" :key="album.id">
        <div class="cover">
          <img :src="album.pochette" alt="Album Cover" height="150" width="120" />
        </div>
        <div class="info">
          <div class="title">{{ album.titre }}</div>
          <div class="date">{{ album.dateSortie }}</div>
          <router-link tag="li" :to="'/albums/' + album._id"><a>Détail</a></router-link>
        </div>
      </div>
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
  margin-left: 270px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  width: calc(33.33% - 20px); /* 3 cards per row */
  margin-bottom: 20px;
  background-color: rgb(183, 226, 25);
  font-family: inherit;
  border-radius: 8px;
  padding: 10px;
}

.cover {
  margin-right: 10px;
}

.info {
  flex: 1;
}

.title {
  font-weight: bold;
  color: rgb(127, 155, 29);
  margin-bottom: 5px;
}

.date {
  color: rgb(127, 155, 29);
}

.router-link {
  margin-top: 10px;
  color: rgb(127, 155, 29);
}

.router-link a {
  text-decoration: none;
}
</style>
