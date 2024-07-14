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

    <div class="content">
        <!-- Elenco film -->
        <h2>Films</h2>
        <ul>
            <li v-for="movie in store.movieList" :key="movie.id">
              <div class="back">

                   <div class="hide"><span class="type"> TITLE :</span> {{ movie.title }}</div> 
                  <div class="hide"><span class="type"> ORIGINAL_TITLE :</span> {{ movie.original_title }}</div> 
                  <div class="hide"><span class="type"> LANG : </span><div class="inline" v-html="getFlag(movie.original_language)"></div></div> 
                  <div class="hide"><span class="type"> VOTE :</span>  <span v-html="getStarVote(movie.vote_average)"></span></div> 
              </div>
               

              <!-- Copertina Immagine -->
              <div class="front">
                <img :src="getImageUrl(movie.poster_path)" alt="Poster Immage">
              </div>
              
            </li>
        </ul> 

        <!-- Elenco seires -->
        <h2>Series</h2>
        <ul>
          <li v-for="serie in store.seriesList" :key="serie.id">

            <div class="back">
                <div class="hide"><span class="type">NAME :</span> {{ serie.name }}</div> 
              <div class="hide"><span class="type">ORIGINAL_NAME :</span> {{ serie.original_name }}</div> 
              <div class="hide"><span class="type">LANG : </span><div class="inline" v-html="getFlag(serie.original_language)"></div></div> 
              <div class="hide"><span class="type">VOTE :</span> <span v-html="getStarVote(serie.vote_average)"></span> </div>
            </div>
            

            <!-- Copertina Immagine -->
            <div class="front">
              <img :src="getImageUrl(serie.poster_path)" alt="Poster Immage">
            </div>
            
          </li>
        </ul>
    </div>
        
</template>

<style >
template{
  display: flex;
  align-items: center;
}

h2{
  color: #ffffff;
}

/* Contenitore per mantenere la prospettiva 3D */
li{
  width: 250px;
  height: 400px; /* Altezza aggiunta per migliorare la visibilità della rotazione */
  perspective: 1000px;
}

.front, .back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.front {
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: #ffffff;
  padding: 20px;
}

/* Rotazione dell'elemento li al passaggio del mouse */
li:hover .front {
  transform: rotateY(-180deg);
}

li:hover .back {
  transform: rotateY(0deg);
}

.type{
  color: red;
}

span i{
  color: #ffffff;
}

.inline{
  display: inline;
}

img{
  width: 100%;
}

.content{
  padding: auto;
  text-align: center;
  color: black;
}

ul{
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

li{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: black;
  color: #ffffff;
}

.head{
  background-color: black;
  padding: 20px;
}

</style>
