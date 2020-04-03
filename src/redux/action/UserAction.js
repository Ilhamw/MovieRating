import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = 'https://gamovieapp.herokuapp.com/api';

export const getToken = () => {
    return async dispatch => {
        try {
            const res = await AsyncStorage.getItem("token")
            dispatch({ type: "GET_TOKEN_SUCCESS", payload: res })
        } catch (error) {
            dispatch({ type: "GET_TOKEN_FAILED" })
        }
    }
}

export const getUser = token => {
    return async dispatch => {
        try {
            const res = await axios.get(
                baseURL + '/user/userProfile',
                {
                    headers: { 'Authorization': token }
                }
            );
            console.log('response ', res.data.data)
            dispatch({ type: "GET_USER_SUCCESS", payload: res.data.data })
        } catch (error) {
            console.log('error ', error)
            dispatch({ type: "GET_USER_FAILED" })
        }
    }
}

export const handleImage = (response, token) => {
    return async dispatch => {
        try {
            var dataForm = new FormData();
            dataForm.append('image', {
                uri: response.uri,
                type: response.type,
                name: response.fileName,
            });

            const res = await axios.put(
                baseURL + '/user/updateImage',
                dataForm,
                {
                    headers: {
                        accept: 'image/png',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token,
                    },
                },
            )
            // console.log('res ', res.data.data)
            dispatch({ type: "IMAGE_UPLOAD_SUCCESS", payload: res.data.data })
            dispatch(getUser())
        } catch (error) {
            console.log('error uploading image', error)
            dispatch({ type: "IMAGE_UPLOAD_FAILED" })
        }
    }
};

export const changeProfile = (name, token) => {
    return async dispatch => {
        try {
            const res = await axios.put(
                baseURL + `/user/updateProfile`,
                {
                    name: name
                },
                {
                    'Authorization': token
                }
            )
            console.log('response', res)
            dispatch({ type: "NAME_CHANGE_SUCCESS" })
        } catch (error) {
            console.log('error changing name', error)
            dispatch({ type: "NAME_CHANGE_FAILED" })
        }
    }
}

export const changePassword = (password, token) => {
    return async dispatch => {
        try {
            const res = await axios.put(
                baseURL + `/user/resetPassword/` + token,
                {
                    password: password,
                    password_confirmation: password 
                }
            )
            console.log('response', res)
            dispatch({ type: "PASSWORD_CHANGE_SUCCESS" })
        } catch (error) {
            console.log('error changing password', error)
            dispatch({ type: "PASSWORD_CHANGE_FAILED" })
        }
    }
}