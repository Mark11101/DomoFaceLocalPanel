import { showErrorMessage } from '../../../../../utils/notifications/messages'

export const initialState = []

const EmergencySipAccountsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_EMERGENCY_SIP_ACCOUNTS_SUCCESS':
      return action.payload.response

    case 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_SUCCESS':

      return [
        ...state,
        action.payload.response,
      ]

    case 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_ERROR':
      showErrorMessage('Не удалось добавить аккаунт, попробуйте еще раз')
      return state

    case 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS_ERROR':
      showErrorMessage('Не удалось удалить аккаунты, попробуйте еще раз')
      return state

    case 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT_ERROR':
      showErrorMessage('Не удалось удалить аккаунт, попробуйте еще раз')
      return state

    default:
      return state
  }
}

export default EmergencySipAccountsReducer
