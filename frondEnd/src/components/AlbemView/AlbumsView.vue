<template>
    <h1> Page Album </h1>
    <div class="panel panel-primary">
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">test</th>
                    <th scope="col">test</th>
                    <th scope="col">test</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="album in albums ">
                    <td>{{ album.test }}</td>
                    <td>{{ album.test }}</td>
                    <td>{{ album.test }}</td>
                </tr>
            </tbody>
        </table>
        <td><router-link class="btn btn-primary" to="albums">Retour</router-link></td>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
    components: {
        Header, // N'oubliez pas d'enregistrer le composant dans la section 'components'
    },
    props: {
        albums: Array,

    },
    mounted() {
        this.getAlbums(this.$route.query)
    },
    methods: {
        getAlbums(id) {
            axios.get(`http://127.0.0.1:8000/album`, { id })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}




</script>
<style></style>