const initialState = {
    data: [],
    images: [],
    details: [],
    genres: [],
    info: '',
    all: []
};

export const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_NOW_SUCCESS":
            return { ...state, info: "success", data: action.payload }
        case "GET_NOW_FAILED":
            return { ...state, info: "failed" }
        case "GET_DETAILS_SUCCESS":
            return { ...state, details: action.payload }
        case "GET_DETAILS_FAILED":
            return { ...state }
        case "GET_SEARCH_SUCCESS":
            return { ...state, info: "success", data: action.payload }
        case "GET_SEARCH_FAILED":
            return { ...state, info: "failed" }
        case "GET_FILTERED_SUCCESS":
            return { ...state, info: "success", data: action.payload }
        case "GET_FILTERED_FAILED":
            return { ...state, info: "failed" }
        case "GET_GENRES_SUCCESS":
            return { ...state, info: "success", genres: action.payload.genres }
        case "GET_GENRES_FAILED":
            return { ...state, info: "failed" }
        case "SUCCESS":
            return { ...state, all: action.payload }
        case "FAILED":
            return { ...state }
        default:
            return state;
    }
};
