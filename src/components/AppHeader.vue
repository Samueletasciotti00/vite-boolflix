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

  <div>
    <!-- Intput ricerca testo -->
    <input type="text" v-model="store.searchText">

    <!-- Bottone di ricerca -->
    <button @click="$emit('search')">Ricerca Film</button>
  </div>
    
</template>

<style>
.container-fluid{
    padding: 20px;
}
</style>