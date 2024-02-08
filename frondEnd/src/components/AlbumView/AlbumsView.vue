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
                <div class="mb-1 text-muted">{{ formatDate(album.dateSortie) }}</div>
                <div class="col-lg-4" v-for="artiste in album.artiste" :key="artiste._id">
  <h3 class="mb-0">{{ artiste.nom }}</h3>
</div>
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
      artisteDetails: {}, // Variable pour stocker les détails de l'artiste
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (!id) {
      console.error("Aucun ID d'album fourni dans l'URL");
      return;
    }
    this.getAlbum(id);
  },
  methods: {
    getAlbum(id) {
      axios
        .get(`http://localhost:3000/album/${id}`)
        .then((response) => {
          this.album = response.data;
          this.getArtisteNom(this.album.artiste); // Appel pour récupérer le nom de l'artiste
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails de l'album:", error.message);
        });
    },
    getArtisteNom(artisteIds) {
      axios
        .get(`http://localhost:3000/artiste/${id}`, {
          params: {
            ids: artisteIds.join(), // Concatène les IDs des artistes pour l'appel API
          },
        })
        .then((response) => {
          this.artisteDetails = response.data; // Stockage des détails de l'artiste dans la variable
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails de l'artiste:", error.message);
        });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style>
/* Styles pour la page d'album */

/* Conteneur principal */
.album {
  margin: 50px auto; /* Centrage de la zone d'album */
  max-width: 800px; /* Limiter la largeur pour une meilleure lisibilité */
}

/* Style pour le titre de l'album */
.album-title {
  font-size: 24px;
  font-weight: bold;
  color: #333; /* Couleur du texte */
  margin-bottom: 20px; /* Espace en bas du titre */
}

/* Style pour la date de sortie de l'album */
.album-date {
  font-size: 16px;
  color: #666; /* Couleur du texte */
  margin-bottom: 20px; /* Espace en bas de la date */
}

/* Style pour le nom des artistes associés à l'album */
.artist-name {
  font-size: 18px;
  color: #007bff; /* Couleur du texte */
  margin-bottom: 10px; /* Espace en bas du nom de l'artiste */
}

/* Style pour la table des morceaux de l'album */
.album-table {
  width: 100%;
  border-collapse: collapse; /* Fusionner les bordures de la table */
}

/* Style pour l'en-tête de la table des morceaux */
.album-table th {
  padding: 10px;
  background-color: #007bff; /* Couleur de fond de l'en-tête */
  color: #fff; /* Couleur du texte de l'en-tête */
  text-align: left; /* Alignement du texte à gauche */
}

/* Style pour les lignes de la table des morceaux */
.album-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc; /* Bordure basse de chaque ligne */
}

/* Style pour le bouton de retour */
.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff; /* Couleur de fond du bouton */
  color: #fff; /* Couleur du texte du bouton */
  text-decoration: none; /* Suppression du soulignement du texte */
  border: none; /* Suppression de la bordure */
  border-radius: 5px; /* Coins arrondis */
  transition: background-color 0.3s; /* Transition en douceur */
}

/* Style pour le survol du bouton de retour */
.back-button:hover {
  background-color: #0056b3; /* Nouvelle couleur de fond au survol */
  cursor: pointer; /* Curseur de la souris en forme de main */
}
/* Ajoutez vos styles CSS ici */
</style>