<template>
    <Header />
    <h1>Liste Artiste</h1>
    <div class="art">
        <div class="row" v-for="artiste in artistes" :key="artiste._id">
            <div class="card">
                <p>{{ artiste.biographie }}</p>
              
                <div class="wrapper">
                    <img :src="artiste.avatar" alt="Avatar" class="avatar">
                    
                </div>
                <router-link :to="'/artiste/' + artiste._id" class="detail-link">
                        Détail
                    </router-link>
                <h2>{{ artiste.nom }}</h2>
                

               
            </div>
           
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from '../Header.vue'

export default {
  components: {
    Header,
  },
  data() {
    return {
      artistes: []
    };
  },
  mounted() {
    this.getArtist();
  },
  methods: {
    async getArtist() {
      try {
        const response = await axios.get("http://localhost:3000/artiste");
        this.artistes = response.data;
      } catch (error) {
        console.error("Error fetching artistes:", error);
      }
    },
  },
};
</script>
<style>
body {
    background-color: #191c29;
    color: wheat;
}
.art {
    margin-left: 340px;
    width: 60%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #191c29;
}
h1{
    margin-left: 260px;
    
}

.wrapper h2 {
    margin-left: 20px;
    color: aliceblue;
    margin-top: 20%;
}


.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    /* Add margin to the top of the row */
}

.card {
    width: var(--card-width);
    height: var(--card-height);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 36px;
    perspective: 2500px;
    margin: 0 50px;
    margin-bottom: 20px;
    /* Add margin to the bottom of each card */
    margin-top: 100%;
}

:root {
    --card-height: 300px;
    --card-width: calc(var(--card-height) / 1.5);

}

* {
    box-sizing: border-box;
}

.card {
    width: var(--card-width);
    height: var(--card-height);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 36px;
    perspective: 2500px;
    margin: 0 50px;

}

.cover-image {
    width: 100%;
    height: 10%;
    object-fit: cover;
}

.wrapper {
    transition: all 0.5s;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;

}
.wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.card:hover .wrapper {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.wrapper::before,
.wrapper::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
}

.wrapper::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(to top,
            transparent 46%,
            rgba(12, 13, 19, 0.5) 68%,
            rgba(12, 13, 19) 97%);
}

.wrapper::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(to bottom,
            transparent 46%,
            rgba(12, 13, 19, 0.5) 68%,
            rgba(12, 13, 19) 97%);
}

.card:hover .wrapper::before,
.wrapper::after {
    opacity: 1;
}

.card:hover .wrapper::after {
    height: 120px;
}

.title {
    width: 100%;
    transition: transform 0.5s;
}

.card:hover .title {
    transform: translate3d(0%, -50px, 100px);
}

.character {
    width: 100%;
    opacity: 0;
    transition: all 0.5s;
    position: absolute;
    z-index: -1;
}

.card:hover .character {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
}
.detail-link {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: background-color 0.3s;
}

.detail-link:hover {
    background-color: rgba(255, 255, 255, 1);
}
</style>