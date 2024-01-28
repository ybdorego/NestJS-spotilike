<template>

</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default{
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
            axios.get(`http://127.0.0.1:3000/album`, { id })
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