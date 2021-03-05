import {
  showSuccessMessage,
  showErrorMessage,
} from '../../../../../utils/notifications/messages'
import ConnectionTypes from '../../../../../constants/ConnectionTypes'

export const initialState = {
  server:       '',
  login:        '',
  password:     '',
  useStun:      false,
  useStunMedia: false,
  useIce:       false,
  useTurn:      false,
  turnServer: {
    server:         '',
    connectionType: ConnectionTypes.UDP,
    login:          '',
    password:       '',
  }
}

const EmergencyCredentialReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_EMERGENCY_CREDENTIAL_SUCCESS':
      return {
        ...state,
        server: action.payload.response.server,
        login: action.payload.response.login,
        password: action.payload.response.password,
        useStun: action.payload.response.useStun,
        useStunMedia: action.payload.response.useStunMedia,
        useIce: action.payload.response.useIce,
        useTurn: action.payload.response.useTurn,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_SUCCESS': 
      showSuccessMessage('Настройки сброшены')
      
      return {
        ...state,
        server: action.payload.response.server,
        login: action.payload.response.login,
        password: action.payload.response.password,
        useStun: action.payload.response.useStun,
        useStunMedia: action.payload.response.useStunMedia,
        useIce: action.payload.response.useIce,
        useTurn: action.payload.response.useTurn,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_ERROR': 
      showErrorMessage('Не удалось сбросить настройки, попробуйте еще раз')
      return state

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_SUCCESS':
      showSuccessMessage('Настройки успешно сохранены')
      return state

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_ERROR':
      showErrorMessage('Не удалось сохранить настройки домофона, попробуйте еще раз')
      return state

    case 'REQUEST_EMERGENCY_CREDENTIAL_TURN_SUCCESS':
      return {
        ...state,
        turnServer: {
          server: action.payload.response.server,
          connectionType: action.payload.response.connectionType,
          login: action.payload.response.login || '',
          password: action.payload.response.password || '',
        }
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_SUCCESS': 
      showSuccessMessage('Настройки сброшены')
      
      return {
        ...state,
        turnServer: {
          server: action.payload.response.server,
          connectionType: action.payload.response.connectionType,
          login: action.payload.response.login || '',
          password: action.payload.response.password || '',
        }
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_ERROR': 
      showErrorMessage('Не удалось сбросить настройки, попробуйте еще раз')
      return state

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_SUCCESS':
      showSuccessMessage('Настройки успешно сохранены')
      return state

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_ERROR':
      showErrorMessage('Не удалось сохранить настройки домофона, попробуйте еще раз')
      return state

    case 'CHANGE_EMERGENCY_CREDENTIAL_SERVER':
      return {
        ...state,
        server: action.payload.server,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_LOGIN':
      return {
        ...state,
        login: action.payload.login,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_USE_STUN':
      return {
        ...state,
        useStun: !state.useStun,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_USE_STUN_MEDIA':
      return {
        ...state,
        useStunMedia: !state.useStunMedia,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_USE_ICE':
      return {
        ...state,
        useIce: !state.useIce,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_USE_TURN':
      return {
        ...state,
        useTurn: !state.useTurn,
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_SERVER':
      return {
        ...state,
        turnServer: {
          ...state.turnServer,
          server: action.payload.server,
        },
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_CONNECTION_TYPE':
      return {
        ...state,
        turnServer: {
          ...state.turnServer,
          connectionType: action.payload.connectionType,
        },
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_LOGIN':
      return {
        ...state,
        turnServer: {
          ...state.turnServer,
          login: action.payload.login,
        },
      }
    case 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_PASSWORD':
      return {
        ...state,
        turnServer: {
          ...state.turnServer,
          password: action.payload.password,
        },
      }
    default:
      return state
  }
}

export default EmergencyCredentialReducer
