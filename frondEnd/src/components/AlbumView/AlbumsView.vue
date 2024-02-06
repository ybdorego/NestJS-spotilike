<template>
    <div>
      <Header />
  
      <h1>Page Album</h1>
      <div class="panel panel-primary">
        <div class="row mb-2" v-for="album in albums" :key="album.id">
          <div class="col-md-6">
            <div class="card flex-md-row mb-4 shadow-sm h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-primary">{{ album.titre }}</strong>
                <div class="mb-1 text-muted">{{ album.dateSortie }}</div>
                <h3 class="mb-0">{{ album.artist.titre }}</h3>
              </div>
              <img
                v-if="album.pochette"
                class="bd-placeholder-img card-img-right flex-auto d-none d-lg-block"
                width="200"
                height="250"
                :src="album.pochette"
                alt="Album Cover"
              />
            </div>
          </div>
        </div>
  
        <table class="table table-bordered" v-if="albums && albums.morceaux">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="morceau in albums.morceaux" :key="morceau.id">
              <td>{{ morceau.titre }}</td>
              <td>{{ morceau.duree }}</td>
            </tr>
          </tbody>
        </table>
  
        <router-link class="btn btn-primary" :to="{ name: 'albums' }">Retour</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Header from "@/components/Header.vue";
  import axios from "axios";
  
  export default {
    components: {
      Header,
    },
    setup() {
      const albums = ref([]);
  
      const getAlbums = async (id) => {
        try {
          const response = await axios.get(`http://127.0.0.1:3000/album/${id}`);
          albums.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      onMounted(() => {
        getAlbums();
      });
  
      return { albums, getAlbums };
    },
  };
  </script>
  
  <style></style>
  