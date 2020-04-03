import axios from 'axios'

const baseURL = 'https://gamovieapp.herokuapp.com/api';

export const handleSubmit = (title, rating, description, id, token) => {
    console.log(title, rating, description, id, token)
    return async dispatch => {
        try {
            const res = await axios.post(
                baseURL + `/review/` + id,
                {
                    title: title,
                    rating: rating,
                    description: description
                },
                {
                    headers: { 'Authorization': token }
                }
            );
            console.log("response", res)
            dispatch({ type: "SUBMIT_SUCCESS" })
        } catch (error) {
            console.log("error submitting review", error)
            dispatch({ type: "SUBMIT_FAILED" })
        }
    }
}

export const getReviews = id => {
    return async dispatch => {
        try {
            const res = await axios.get(
                baseURL + `/review/` + id,
            )
            console.log("response ", res.data.data)
            dispatch({ type: "GET_REVIEW_SUCCESS", payload: res.data.data })
        } catch (error) {
            console.log("error getting review", error)
            dispatch({ type: "GET_REVIEW_FAILED" })
        }

    }
}