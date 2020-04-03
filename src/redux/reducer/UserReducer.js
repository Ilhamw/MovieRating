const initialState = {
    user: [],
    image: '',
    token: '',
    info: ''
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_SUCCESS":
            return { ...state, info: "success", user: action.payload, image: action.payload.image }
        case "GET_USER_FAILED":
            return { ...state, info: "failed" }
        case "GET_TOKEN_SUCCESS":
            return { ...state, token: action.payload }
        case "GET_TOKEN_FAILED":
            return { ...state }
        case "IMAGE_UPLOAD_SUCCESS":
            return { ...state, info: "success", image: action.payload.image }
        case "IMAGE_UPLOAD_FAILED":
            return { ...state, info: "failed" }
        case "NAME_CHANGE_SUCCESS":
            return { ...state, info: "success" }
        case "NAME_CHANGE_FAILED":
            return { ...state, info: "failed" }
        case "PASSWORD_CHANGE_SUCCESS":
            return { ...state, info: "success" }
        case "PASSWORD_CHANGE_FAILED":
            return { ...state, info: "failed" }
        default:
            return { ...state }
    }
}
