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
                  <h5 class="mb-1 text-muted">{{ formatDate(artiste.createdAt) }}</h5>
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
                <router-link class="btn btn-primary" to="/artiste">Retour</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="alb">
        <div v-if="artiste.albums && artiste.albums.length > 0">
          <div class="row">
            <div class="col-lg-4" v-for="album in artiste.albums" :key="album._id">
              <img
                v-if="album.pochette"
                class="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                :src="album.pochette"
                alt="Album Cover"
              />
              <h2>{{ album.titre }}</h2>
              <h4>{{ formatDate(album.dateSortie) }}</h4>
              <div>
                <h3>Morceaux:</h3>
                <ul>
                  <table class="table table-bordered">
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
                </ul>
              </div>
             
            </div>
          </div>
        </div>
        <div v-else>
          <p>Cet artiste n'a pas d'albums.</p>
        </div>
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
      morceauxDetails: [],
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
        .get(`http://localhost:3000/artiste/Artistealbum/${id}`)
        .then((response) => {
          this.artiste = response.data;
          this.getMorceauxDetails(this.artiste.morceaux); // Appel pour récupérer les détails des morceaux
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails de l'artiste:", error.message);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    getMorceauxDetails(morceauxIds) {
      axios
        .get(`http://localhost:3000/morceau/${id}`, {
          params: {
            ids: morceauxIds.join(), // Concatène les IDs des morceaux pour l'appel API
          },
        })
        .then((response) => {
          this.morceauxDetails = response.data; // Stocke les détails des morceaux dans le tableau
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails des morceaux:", error.message);
        });
    },
  },
};
</script>

<style scoped>
p {
  color: #ffffff;
}
.alb {
  color: #ffffff;
}
</style>