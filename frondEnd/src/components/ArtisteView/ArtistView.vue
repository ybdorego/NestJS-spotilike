<template>
    <Header />

</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default{

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
            axios.get(`http://127.0.0.1:3000/api/artiste`, { id })
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
<style>
</style>