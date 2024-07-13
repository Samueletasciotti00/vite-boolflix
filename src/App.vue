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
          const size = 'w342'; // Size img
          return `${baseUrl}${size}${posterPath}`; //Url completo
      },

      // Creare un funzione per la votazione in stelle
      getStarVote(vote_average) {
        
        let a = Math.ceil(vote_average) / 2;
        a = Math.ceil(a);

        if(a == 0) {
          return '<i class="fa-solid fa-poo"></i>';
        } else if (a == 1) {
          return '<i class="fa-solid fa-star"></i>'
        } else if (a == 2) {
          return '<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>'
        } else if (a == 3) {
          return '<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star">';
        } else if (a == 4) {
          return '<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>'
        } else if (a == 5){
          return '<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>'
        }
      },

      // Convertiamo le bandiere
      getFlag(original_language) {
        if(original_language == 'en') {
          return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
        } else if (original_language == 'it') {
          return '🇮🇹';
        } else if (original_language == 'sp') {
          return '🇪🇸';
        } else if (original_language == 'ja') {
          return '🇯🇵';
        } else if (original_language == 'de') {
          return '🇩🇪';
        } else if (original_language == 'fr') {
          return '🇫🇷';
        }
      }

    },
    created() {
      this.getInfo();
      this.getStarVote();
    }
} 

</script>

<template>

    <!-- Header -->
    <div class="head">
       <AppHeader @search="getInfo " @keyup.enter="getInfo"/>
    
    </div>
   
    <!-- Lista film -->
    <div v-if="store.loading"><h1>Caricamento...</h1></div>


    <!-- Elenco film -->
    <h2>Films</h2>
    <ul>
        <li v-for="movie in store.movieList" :key="movie.id">
          <span class="type"> TITLE :</span> {{ movie.title }} 
          <span class="type"> ORIGINAL_TITLE :</span> {{ movie.original_title }} 
          <span class="type"> LANG : </span><div class="inline" v-html="getFlag(movie.original_language)"></div> 
          <span class="type"> VOTE :</span>  <span v-html="getStarVote(movie.vote_average)"></span> 
          <span class="type"> IMG : </span> <img :src="getImageUrl(movie.poster_path)" alt="">
        </li>
    </ul> 

    <!-- Elenco seires -->
    <h2>Series</h2>
    <ul>
       <li v-for="serie in store.seriesList" :key="serie.id">
         <span class="type hide">NAME :</span> {{ serie.name }} 
         <span class="type hide">ORIGINAL_NAME :</span> {{ serie.original_name }} 
         <span class="type hide">LANG : </span><div class="inline" v-html="getFlag(serie.original_language)"></div> 
         <span class="type hide">VOTE :</span> <span v-html="getStarVote(serie.vote_average)"></span> 
         <span class="type hide"> IMG : </span> <img :src="getImageUrl(serie.poster_path)" alt="">
      </li>
    </ul>
</template>

<style >
template{
  display: flex;
  align-items: center;
}

body{
  background-color: gray;
}

.type{
  color: red;
}

.type.hide

span i{
  color: #ffffff;
}

.inline{
  display: inline;
}

img{
  width: 50%;
}

ul{
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin: 30px auto;
}

li{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  color: #ffffff;
  background-color: black;
  width: 300px;
}

.head{
  background-color: black;
  padding: 20px;
}
</style>
