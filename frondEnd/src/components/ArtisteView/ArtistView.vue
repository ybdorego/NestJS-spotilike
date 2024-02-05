/**
 * Component for displaying artist details and albums.
 */
<template>
    <div>
      <Header />
      <h1>Page artiste</h1>
  
      <div class="panel panel-primary">
        <div class="panel panel-primary">
          <div class="row mb-2" v-for="artiste in artistes" :key="artiste.id">
            <div class="col-md-6">
              <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                <div class="card-body d-flex flex-column align-items-start">
                  <strong class="d-inline-block mb-2 text-primary">{{ artiste.nom }}</strong>
                  <div class="mb-1 text-muted">{{ artiste.dateSortie }}</div>
                  <p class="card-text mb-auto">{{ artiste.biographie }}</p>
                </div>
                <img
                  v-if="artiste.avatar"
                  class="bd-placeholder-img card-img-right flex-auto d-none d-lg-block"
                  width="200"
                  height="250"
                  :src="artiste.avatar"
                  alt="Artiste Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row" v-if="artiste.albums">
        <div class="col-lg-4" v-for="album in artiste.albums" :key="album.id">
          <img
            v-if="album.pochette"
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            :src="album.pochette"
            alt="Album Cover"
          />
          <h2>{{ album.titre }}</h2>
          <h4>{{ album.dateSortie }}</h4>
  
          <table class="table table-bordered" v-if="album.morceaux && album.morceaux.length > 0">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="morceau in album.morceaux" :key="morceau.id">
                <td>{{ morceau.titre }}</td>
                <td>{{ morceau.duree }}</td>
              </tr>
            </tbody>
          </table>
  
          <router-link class="btn btn-primary" to="/artiste">Retour</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import axios from "axios";
  
  export default {
    components: {
      Header,
    },
    props: {
      artistes: Array,
    },
    data() {
      return {
        artiste: {},
      };
    },
    mounted() {
      this.getArtist(this.$route.query.id);
    },
    methods: {
      /**
       * Fetches artist details from the API.
       * @param {number} id - The ID of the artist.
       */
      getArtist(id) {
        axios
          .get(`http://127.0.0.1:8000/api/artiste/${id}`)
          .then((response) => {
            this.artiste = response.data;
            console.log(this.artiste);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
<style></style>