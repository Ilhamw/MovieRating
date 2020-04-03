import axios from 'axios'

const baseURL = 'https://api.themoviedb.org/3'
const URL = 'https://gamovieapp.herokuapp.com/api'
const token = '570c36d75740509c00d865a804d826a5'

export const getNowPlaying = page => {
    return async dispatch => {
        try {
            const res = await axios.get(
                URL + `/movie`,
                {
                    params: { 'page': page },
                    headers: { 'Content-Type': 'application/json',  },
                },
            );
            console.log('response ', res.data.data);
            dispatch({ type: "GET_NOW_SUCCESS", payload: res.data.data })
        } catch (e) {
            console.log('error getting now playing ', e);
            dispatch({ type: "GET_NOW_FAILED" })
        }
    };
};

export const getDetails = id => {
    return async dispatch => {
        try {
            const res = await axios.get(
                URL + `/movie/${id}`,
                {
                    headers: { 'Content-Type': 'application/json',  },
                },
            );
            console.log('response ', res.data.data);
            dispatch({ type: "GET_DETAILS_SUCCESS", payload: res.data.data })
        } catch (e) {
            console.log('error getting movie details ', e);
            dispatch({ type: "GET_DETAILS_FAILED" })
        }
    };
};

export const getSearch = search => {
    return async dispatch => {
        try {
            const res = await axios.get(
                URL + `/movie`,
                {
                    params: {
                        "field": "title",
                        "value": search
                    },
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            console.log('response ', res.data.data);
            dispatch({ type: "GET_SEARCH_SUCCESS", payload: res.data.data })
        } catch (e) {
            console.log('error getting search ', e);
            dispatch({ type: "GET_SEARCH_FAILED" })
        }
    };
};

export const getGenres = () => {
    return async dispatch => {
        try {
            const res = await axios.get(
                baseURL + '/genre/movie/list',
                {
                    params: {'api_key': token,},
                    headers: { 'Content-Type': 'application/json',  },
    
                }
            );
            // console.log('genres', res.data)
            dispatch({ type: "GET_GENRES_SUCCESS", payload: res.data})
        } catch (e) {
            console.log('error getting genre ', e);
            dispatch({ type: "GET_GENRES_FAILED" })
        }
    }
}

export const getFilter = id => {
    return async dispatch => {
        // Multi-select Genre Filter
        // try {
        //     const res = await axios.get(
        //         baseURL + `/discover/movie`,
        //         {
        //             params: {
        //                 'api_key': token,
        //                 'with_genres': id
        //             },
        //             headers: { 'Content-Type': 'application/json' },
        //         }
        //     );
        //     console.log('filtered', res.data)
        //     dispatch({ type: "GET_FILTERED_SUCCESS", payload: res.data})
        // } catch (e) {
        //     console.log('error getting filtered ', e);
        //     dispatch({ type: "GET_FILTERED_FAILED" })
        // }

        try {
            const res = await axios.get(
                URL + `/movie`,
                {
                    params: {
                        "field": "genre",
                        "value": id
                    },
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('filtered', res.data.data)
            dispatch({ type: "GET_FILTERED_SUCCESS", payload: res.data.data})
        } catch (e) {
            console.log('error getting filtered ', e);
            dispatch({ type: "GET_FILTERED_FAILED" })
        }
    }
}