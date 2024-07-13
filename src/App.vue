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
        store,
      }
    },
    methods: {
      getFilms(){

        let endPoint = store.searchText ? `${store.apiURL}${store.apiNameParam}${store.searchText}` : store.apiURL; 
        console.log(endPoint);
        store.loading = true;
        // Gestione delle chiamate con Axios
        axios
        .get(endPoint)
        .then(res => {
          console.log(res);
          store.movieList = res.data.results;
          store.loading = false;
        })
        .catch(err => {
          console.log(err);
          store.loading = false;
        });

         
      }
    },
    created() {
      this.getFilms();
    }
} 

</script>

<template>

    <!-- Header -->
    <AppHeader @search="getFilms" />
    
    <!-- Lista film -->
    <div v-if="store.loading"><h1>Caricamento...</h1></div>
    <ul>
      <li v-for="movie in store.movieList" :key="movie.id"> <span>TITLE :</span> {{ movie.title }} <span>ORIGINAL_TITLE :</span> {{ movie.original_title }} <span>LENG : </span>
      {{movie.original_language}} <span>VOTE :</span>  {{movie.vote_average}}</li>

    </ul>
</template>

<style scoped>
span{
  color: red;
}
</style>
