<template>
  <div>
    <Header />
    <h1>Page Album</h1>
    <div class="album">

    <div class="panel panel-primary">
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">{{ album.titre }}</strong>
              <div class="mb-1 text-muted">{{ album.dateSortie }}</div>
              <h3 class="mb-0">{{ getArtisteNom() }}</h3>
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

      <table class="table table-bordered" v-if="album.morceaux && album.morceaux.length > 0">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="morceau in album.morceaux" :key="morceau._id">
            <td>{{ morceau.titre }}</td>
            <td>{{ morceau.duree }}</td>
          </tr>
        </tbody>
      </table>

      <router-link class="btn btn-primary" to="/albums">Retour</router-link> <!-- Lien pour revenir à la liste des albums -->
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
    albums: Array,
  },
  data() {
    return {
      album: {},
      id: null, 
      artisteNom: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (!id) {
      console.error("Aucun ID d'album fourni dans l'URL");
      return;
    }this.getAlbum(id); 
  },
  methods: {
    getAlbum(id) {
      axios
        .get(`http://localhost:3000/album/${id}`)
        .then((response) => {
          this.album = response.data;
          this.artisteId = response.data.artiste[0];
          this.getArtisteNom();
          console.log(this.album);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails de l'album:", error.message);
        });
    },
    
   getArtisteNom() {
      if (this.id) {
        axios
          .get(`http://localhost:3000/artiste/${this.id}`)
          .then((response) => {
            this.artistes = response.data;
            this.artisteNom = response.data.nom; 
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
.album{
margin-left: 240px;;
}
/* Ajoutez vos styles CSS ici */
</style>
