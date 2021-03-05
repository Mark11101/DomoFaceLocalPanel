import { showErrorMessage } from '../../../../../utils/notifications/messages'

export const initialState = []

const StunServersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_STUN_SERVERS_SUCCESS':
      return action.payload.response

    case 'REQUEST_ADD_STUN_SERVER_SUCCESS':
      return [
        ...state,
        action.payload.response,
      ]

    case 'REQUEST_ADD_STUN_SERVER_ERROR':
      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')
      return state

    case 'REQUEST_DELETE_ALL_STUN_SERVERS_ERROR':
      showErrorMessage('Не удалось удалить серверы, попробуйте еще раз')
      return state

    case 'REQUEST_DELETE_STUN_SERVER_ERROR':
      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')
      return state
      
    default:
      return state
  }
}

export default StunServersReducer
