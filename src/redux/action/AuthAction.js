import axios from 'axios'

const baseURL = 'https://gamovieapp.herokuapp.com/api';

export const register = (name, email, password, password_confirmation, image) => {
    return async dispatch => {
        try {
            const res = await axios.post(
                baseURL + '/user/register',
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    image: image
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            console.log('response ', res.data.data);
            dispatch({ type: "REGISTER_SUCCESS" })
        } catch (e) {
            console.log('error register ', e);
            dispatch({ type: "REGISTER_FAILED" })
        }
    };
};

export const addImage = response => {
    return async dispatch => {
        try {
            console.log('response', response.uri);
            await dispatch({ type: "IMAGE_UPLOAD_SUCCESS", payload: response.uri })
        } catch (error) {
            console.log('error ', error)
            dispatch({ type: "IMAGE_UPLOAD_FAILED" })
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post(
                baseURL + '/user/login',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: { 'Content-Type': 'application/json', },
                },
            );
            console.log('response login ', res.data.data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })
        } catch (e) {
            console.log('error login ', e.response);
            dispatch({ type: "LOGIN_FAILED" })
        }
    };
};