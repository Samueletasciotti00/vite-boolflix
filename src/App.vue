<script>
// Import Libreria Axios
import axios from 'axios';

//Import store 
import { store } from './store.js';

// Import Components
import AppHeader from './components/AppHeader.vue';

export default {
    name: 'App',
    components: {
      AppHeader
    },
    data() {
      return {
        store
      }
    },
    methods: {
      getInfo(){

        let endPoint = store.searchText ? `${store.apiURL}${store.apiNameParam}${store.searchText}` : store.apiURL; // Ricerca film

        let endPointSeries = store.searchText ? `${store.urlSeries}${store.apiNameParam}${store.searchText}` : store.urlSeries; //Ricerca serie

        store.loading = true; //Prima della risposta API vediamo il caricamento in pagina.
        // Gestione delle chiamate con Axios
        axios
        .get(endPoint) //Facciamo richiesta attraverso 'get' e 'endPoint' 
        .then(res => {
          store.movieList = res.data.results; //Restituisce l'array dei film trovati nel nostro array vuoto.
          store.flagConverter = res.data.results.original_language; //Mettiamo nello store la lingua ottenuta.
          store.loading = false; //Interrompe lo stato loading della richiesta.
        })
        .catch(err => {
          console.log(err); //Debug di verifica errore chiamata.
          store.loading = false; //Interrompe lo stato loading della richiesta.
        });

        
        axios // Chiamata API per le Series.
        .get(endPointSeries) //Facciamo richiesta attraverso 'get' e 'endPoint' 
        .then(res => {
          store.seriesList = res.data.results; //Restituisce l'array dei film trovati nel nostro array vuoto.
          store.flagConverter = res.data.results.original_language; //Mettiamo nello store la lingua ottenuta.
          store.loading = false; //Interrompe lo stato loading della richiesta.
        })
        .catch(err => {
          console.log(err); //Debug di verifica errore chiamata.
          store.loading = false; //Interrompe lo stato loading della richiesta.
        });
      },

      // ora prendiamo le immagini e stampiamole in pagina
      getImageUrl(posterPath) {
          const baseUrl = 'https://image.tmdb.org/t/p/';
          const size = 'w342'; // You can change the size according to your needs
          return `${baseUrl}${size}${posterPath}`;
        }
    },
    created() {
      this.getInfo();
    }
} 

</script>

<template>

    <!-- Header -->
    <AppHeader @search="getInfo" @keyup.enter="getInfo"/>
    
    <!-- Lista film -->
    <div v-if="store.loading"><h1>Caricamento...</h1></div>


    <!-- Elenco film -->
    <h2>Films</h2>
    <ul>
      <li v-for="movie in store.movieList" :key="movie.id"> <span>TITLE :</span> {{ movie.title }} <span>ORIGINAL_TITLE :</span> {{ movie.original_title }} <span>LENG : </span>
      <div class="inline" v-html="store.flagger"></div> <span>VOTE :</span>  {{movie.vote_average}} <span> IMG : </span> <img :src="getImageUrl(movie.poster_path)" alt=""></li>
    </ul>

    <!-- Elenco seires -->
    <h2>Series</h2>
    <ul>
       <li v-for="serie in store.seriesList" :key="serie.id"> <span>NAME :</span> {{ serie.name }} <span>ORIGINAL_NAME :</span> {{ serie.original_name }} <span>LENG : </span>
      <div class="inline" v-html="store.flagger"></div> <span>VOTE :</span>  {{serie.vote_average}} </li>
    </ul>
</template>

<style scoped>
span{
  color: red;
}

.inline{
  display: inline;
}

img{
  width: 5%;
}
</style>
