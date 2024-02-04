<template>
    <Header />
    <h1> Page artiste </h1>


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
                <tr v-for="artiste in artistes ">
                    <td>{{ artiste.test }}</td>
                    <td>{{ artiste.test }}</td>
                    <td>{{ artiste.test }}</td>
                </tr>
            </tbody>
        </table>


        <td><router-link class="btn btn-primary" to="artiste">Retour</router-link></td>

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
        artistes: Array,

    },
    mounted() {
        this.getArtist(this.$route.query)
    },
    methods: {
        getArtist(id) {
            axios.get(`http://127.0.0.1:8000/api/artiste`, { id })
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