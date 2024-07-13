<script>

import { store } from '../store.js'

    
// Scrivere l'export dell componente
export default {
    name: 'AppHeader',
    data(){
        return {
            store,
        }
    }      
}
</script>

<template>

  <div class="divider">

    <div><img src="https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" alt=""></div>

    <div>
        <!-- Intput ricerca testo -->
        <input type="text" v-model="store.searchText">

        <!-- Bottone di ricerca -->
        <button @click="$emit('search')">Ricerca Film</button>
    </div>
    

  </div>
    
</template>

<style scoped>
.divider{
    display: flex;
    justify-content: space-between;
}
</style>