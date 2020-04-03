const initialState = {
    title: '',
    rating: 0,
    description: '',
    reviews: [],
};

export const RateReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMIT_SUCCESS":
            return { ...state }
        case "SUBMIT_FAILED":
            return { ...state }
        case "GET_REVIEW_SUCCESS":
            return { ...state, reviews: action.payload }
        case "GET_REVIEW_FAILED":
            return { ...state }
        default:
            return state;
    }
};
