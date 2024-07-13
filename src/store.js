import { reactive } from 'vue'

export const store = reactive({
    movieList: [],
    apiURL: 'https://api.themoviedb.org/3/search/movie?api_key=70b5d4fb18cfb09b8168cc33b8d445d7',
    loading: false,
    searchText: '',
    apiNameParam: '&query='
}); 

