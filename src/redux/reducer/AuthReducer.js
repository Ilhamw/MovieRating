const initialState = {
    user: {
        _id: "",
        name: "",
        email: "",
        password: "",
        token: "",
        image: "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg",
    },
    info: "",
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return { ...state, info: "success" }
        case "REGISTER_FAILED":
            return { ...state, info: "failed" }
        case "IMAGE_UPLOAD_SUCCESS":
            return { ...state, info: "success", user: { image: action.payload } }
        case "IMAGE_UPLOAD_FAILED":
            return { ...state, info: "failed" }
        case "LOGIN_SUCCESS":
            return {
                ...state, info: "login success", user: {
                    name: action.payload.name,
                    token: action.payload.token,
                }
            }
        case "LOGIN_FAILED":
            return { ...state, info: "login failed" }
        default:
            return state;
    }
};
