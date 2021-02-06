export const REGISTER_USER = "register_user";
export const REGISTER_FAILED = "register_failed";
export const LOGIN_USER = "login_user";
export const LOGOUT_USER = "logout_user";
export const LOGIN_FAILED = "login_failed";
export const LOAD_USER = "load_user";
export const AUTH_ERROR = "auth_error";


const reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case LOGIN_USER: {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                token: action.payload.token,
            }
        }

        case LOAD_USER: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        }

        case REGISTER_FAILED:
        case LOGOUT_USER:
        case AUTH_ERROR:
        case LOGIN_FAILED: {
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
            }
        }

        default:
            return state
    }
};

export default reducer;