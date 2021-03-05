import {
  showSuccessMessage,
  showErrorMessage,
} from '../../../../utils/notifications/messages'

export const initialState = {
  deviceId: '',
  hardwareVersion: '',
  softwareVersion: '',
  cpuTemp: 0,
  datetime: '',
  intercomSettingsWasReseted: false,
  isIntercomLoading: false,
}

const IntercomInfoReducer = (state = initialState, action) => {
  switch(action.type) {    
    case 'REQUEST_INTERCOM_SETTINGS':
      return {
        ...state,
        isIntercomLoading: true,
      }  
    case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }  
    case 'REQUEST_INTERCOM_SETTINGS_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }
    case 'REQUEST_INTERCOM_INFO':
      return {
        ...state,
        isIntercomLoading: true,
      }
    case 'REQUEST_INTERCOM_INFO_SUCCESS':
      return {
        ...state,
        ...action.payload.response,
        isIntercomLoading: false,
      }   
    case 'REQUEST_INTERCOM_INFO_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }
    case 'REQUEST_OPEN_DOOR_SUCCESS': 
      showSuccessMessage('Дверь открыта!')
      return state

    case 'REQUEST_OPEN_DOOR_ERROR': 
      showErrorMessage('Не удалось открыть дверь, попробуйте еще раз')
      return state

    case 'REQUEST_RESET_SETTINGS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_RESET_SETTINGS_SUCCESS': 
      showSuccessMessage('Настройки сброшены')
      
      window.location.reload()
      
      return {
        ...state,
        intercomSettingsWasReseted: true,
        isIntercomLoading: false,
      }

    case 'TOGGLE_INTERCOM_SETTINGS_WAS_RESETED':
      return {
        ...state,
        intercomSettingsWasReseted: !state.intercomSettingsWasReseted,
      }

    case 'REQUEST_RESET_SETTINGS_ERROR': 
      showErrorMessage('Не удалось сбросить настройки, попробуйте еще раз')
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_INTERCOM_SETTINGS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_INTERCOM_SETTINGS_SUCCESS':
      showSuccessMessage('Настройки домофона успешно сохранены')
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_INTERCOM_SETTINGS_ERROR':
      showErrorMessage('Не удалось сохранить настройки домофона, попробуйте еще раз')
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FIRMWARE':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_FIRMWARE_SUCCESS':

      showSuccessMessage('Прошивка успешно обновлена!')

      window.location.reload()

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FIRMWARE_ERROR':
      
      showErrorMessage('Ну удалось обновить прошивку, попробуйте еще раз')

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_LOAD_SETTINGS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_LOAD_SETTINGS_SUCCESS':

      showSuccessMessage('Настройки успешно загружены!')

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_LOAD_SETTINGS_ERROR':

      const message = action.error.response.data.message;

      if (message === 'Empty flat number') {

        showErrorMessage('Ошибка, некорректный номер квартиры в настройках квартиры')
      } else if (message === 'Empty TURN server') {

        showErrorMessage('Ошибка, некорректный TURN сервер')
      } else {

        showErrorMessage('Ну удалось загрузить настройки, попробуйте еще раз')
      }

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DOWNLOAD_SETTINGS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_DOWNLOAD_SETTINGS_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DOWNLOAD_SETTINGS_ERROR':

      showErrorMessage('Не удалось скачать настройки, попробуйте еще раз')

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_REBOOT_INTERCOM':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_REBOOT_INTERCOM_ERROR':

      showErrorMessage('Не удалось перезагрузить домофон, попробуйте еще раз')

      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_REBOOT_INTERCOM_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL_TURN':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL_TURN_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_FLATS_CREDENTIAL_TURN_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_STUN_SERVERS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_STUN_SERVERS_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_STUN_SERVERS_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_ADD_STUN_SERVER':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_ADD_STUN_SERVER_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_ADD_STUN_SERVER_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DELETE_ALL_STUN_SERVERS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_DELETE_ALL_STUN_SERVERS_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DELETE_STUN_SERVER':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_DELETE_STUN_SERVER_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_EMERGENCY_SIP_ACCOUNTS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_EMERGENCY_SIP_ACCOUNTS_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_EMERGENCY_SIP_ACCOUNTS_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_SUCCESS':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }

    case 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT':
      return {
        ...state,
        isIntercomLoading: true,
      }

    case 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT_ERROR':
      return {
        ...state,
        isIntercomLoading: false,
      }
    
    default:
      return state
  }
}

export default IntercomInfoReducer
