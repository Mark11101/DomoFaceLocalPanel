import { showErrorMessage } from '../../utils/notifications/messages'

export const initialState = {
  isLogged: false,
  login: '',
  password: '',
  intercomHealth: false,
  isAuthLoading: false,
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        login: action.payload.login,
        password: action.payload.password,
        isAuthLoading: true,
      }     

    case 'LOG_OUT':
      return {
        ...state,
        isLogged: false,
      }

    case 'REQUEST_INTERCOM_HEALTH_CHECK_SUCCESS':
      return {
        ...state,
        isLogged: true,
        intercomHealth: true,
        isAuthLoading: false,
      }

    case 'REQUEST_INTERCOM_HEALTH_CHECK_ERROR':

      showErrorMessage('Ошибка')  

      return {
        ...state,
        intercomHealth: false,
        isAuthLoading: false,
      }

    default:
      return state
  }
}

export default AuthReducer
