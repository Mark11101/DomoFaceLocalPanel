import { 
  showErrorMessage,
  showSuccessMessage, 
 } from '../../utils/notifications/messages'

export const initialState = {
  users: [],
  currentUser: {
    id: '',
    login: '',
    role: '',
    flatNumber: 0,
  },
  isUsersLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_USERS':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload.response,
        isUsersLoading: false,
      }

    case 'REQUEST_USERS_ERROR':
      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_CURRENT_USER':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_CURRENT_USER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isUsersLoading: false,
      }

    case 'REQUEST_CURRENT_USER_ERROR':
      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_CREATE_USER':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_CREATE_USER_SUCCESS':
      showSuccessMessage('Аккаунт добавлен!')
      return state

    case 'REQUEST_CREATE_USER_ERROR':

      showErrorMessage('Не удалось создать аккаунт, попробуйте еще раз')

      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_DELETE_ALL_USERS':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_DELETE_ALL_USERS_ERROR':
      showErrorMessage('Не удалось удалить аккаунты, попробуйте еще раз')
      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_DELETE_USER':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_DELETE_USER_ERROR':
      showErrorMessage('Не удалось удалить аккаунт, попробуйте еще раз')
      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_UPDATE_USER':
      return {
        ...state,
        isUsersLoading: true,
      }

    case 'REQUEST_UPDATE_USER_SUCCESS':

      showSuccessMessage('Аккаунт изменен')

      return {
        ...state,
        isUsersLoading: false,
      }

    case 'REQUEST_UPDATE_USER_ERROR':

      showErrorMessage('Не удалось обновить аккаунт, попробуйте еще раз')

      return {
        ...state,
        isUsersLoading: false,
      }

    case 'LOG_OUT':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          role: '',
        }
      }

    default:
      return state
  }
}

export default FacesReducer;
