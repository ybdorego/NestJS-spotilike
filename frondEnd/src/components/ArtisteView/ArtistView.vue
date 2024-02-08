<template>
  <div>
    <Header />
    <h1>Page artiste</h1>
    <div class="art">
      <div class="panel panel-primary">
        <div class="panel panel-primary">
          <div class="row mb-2">
            <div class="col-md-6">
              <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                <div class="card-body d-flex flex-column align-items-start">
                  <h2 class="d-inline-block mb-2 text-primary">{{ artiste.nom }}</h2>
                  <h5 class="mb-1 text-muted">{{ artiste.createdAt }}</h5>
                  <h6 class="card-text mb-auto">{{ artiste.biographie }}</h6>
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
      

 <table class="table table-bordered" v-if="artiste.morceaux && artiste.morceaux.length > 0">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="morceau in artiste.morceaux" :key="morceau._id">
            <td>{{ morceau.titre }}</td>
            <td>{{ morceau.duree }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="artiste.album && artiste.album.length > 0" class="row">
        <div class="col-lg-4" v-for="albumId in artiste.album" :key="albumId">
          <!-- Récupération de l'album correspondant à l'ID -->
          <div v-if="album[albumId]">
            <img
              v-if="album[albumId].pochette"
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              :src="album[albumId].pochette"
              alt="Album Cover"
            />
            <h2>{{ album[albumId].titre }}</h2>
            <h4>{{ album[albumId].dateSortie }}</h4>

            <router-link class="btn btn-primary" to="/artiste">Retour</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Cet artiste n'a pas d'albums.</p>
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
      albumId:null,
      albumDateSortie :null,
      albumPochette:null,
      albumTitre:null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (!id) {
      console.error("Aucun ID d'artiste fourni dans l'URL");
      return;
    }
    this.getArtist(id);
  },
  methods: {
    getArtist(id) {
      axios
        .get(`http://localhost:3000/artiste/${id}`)
        .then((response) => {
          this.artiste = response.data;
          console.log(this.artiste);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails de l'artiste:", error.message);
        });
    },
    getAlbumAll() {
      if (this.albumId) {
        axios
        .get(`http://localhost:3000/album/${this.albumId}`)
          .then((response) => {
            this.album = response.data;
            this.albumTitre = response.data.titre; 
            this.albumPochette = response.data.pochette; 
            this.albumDateSortie = response.data.dateSortie;
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération du nom de l'artiste:", error.message);
          });
      }
    },
  },
};
</script>

<style>


p{
  color: white;
}
</style>
