<script>

import axios from 'axios'
import MovieList from 'MovieList.vue'
    // Scrivere l'export dell componente
    export default {
        name: 'AppHeader',
        components: {
            MovieList
        },
        data() {
            return {
                query:'',
                movies: [],
                apiKey: '70b5d4fb18cfb09b8168cc33b8d445d7'
            };
        },
        methods: {
            async searchMovies() {
                if (this.query.length > 2 ) {
                    try {
                        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                            params: {
                                api_key: this.apiKey,
                                query: this.query
                            }
                        });
                        this.movies = response.data.results;
                    } catch (error) {
                        console.error('Movie Errore', error);
                    }
                } else {
                    this.movie = [];
                }
            }
        }
    };
</script>

<template>

    <!-- Html of Component -->
  <div class="container-fluid bg-black">
    <div class="row">
      <div class="col-12">
        <div></div>
        <div>
          <!-- Ricerca Film/serie -->
          <input type="text" v-model="query" @input="searchMovies" placeholder="ricerca...">

          <!-- Avvia Ricerca -->
          <button @click="searchMovies">Cerca</button>
        </div>
      </div>
    </div>
    <MovieList :movies="movies" />
  </div>
</template>

<style>
.container-fluid{
    padding: 20px;
}
</style>