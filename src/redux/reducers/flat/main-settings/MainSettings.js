import {
  showSuccessMessage,
  showErrorMessage,
} from '../../../../utils/notifications/messages'

export const initialState = {
  number: '',
  useCustomSettings: false,
  blockCalls: false,
  lineThresholds: {
    min: '0',
    max: '0',
  },
  flatSettingsWasReseted: false,
  settingsWasGetted: false,
  isFlatLoading: false,
}

const MainSettingsReducer = (state = initialState, action) => {
  switch(action.type) { 
    case 'REQUEST_FLAT_SETTINGS':
      return {
        ...state,
        isFlatLoading: true,
      }   

    case 'REQUEST_FLAT_SIP_ACCOUNTS_SUCCESS':
      return {
        ...state,
        isFlatLoading: false,
      } 

    case 'REQUEST_FLAT_SETTINGS_SUCCESS':
      return {
        ...state,
        useCustomSettings: action.payload.response.useCustomSettings,
        blockCalls: action.payload.response.blockCalls,
        lineThresholds: action.payload.response.lineThresholds,
        settingsWasGetted: true,
        isFlatLoading: false,
      }

    case 'REQUEST_FLAT_SETTINGS_ERROR':

      showErrorMessage('Квартира не найдена. Возможно вы забыли сохранить диапозон квартир')
      
      return {
        ...state,
        settingsWasGetted: false,
        isFlatLoading: false,
      }

    case 'REQUEST_RESET_FLAT_SETTINGS':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_RESET_FLAT_SETTINGS_SUCCESS':
      return {
        ...state,
        useCustomSettings: action.payload.response.useCustomSettings,
        blockCalls: action.payload.response.blockCalls,
        lineThresholds: action.payload.response.lineThresholds,
        flatSettingsWasReseted: true,
        isFlatLoading: false,
      }

    case 'REQUEST_RESET_FLAT_SETTINGS_ERROR':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'TOGGLE_FLAT_SETTINGS_WAS_RESETED':
      return {
        ...state,
        flatSettingsWasReseted: !state.flatSettingsWasReseted,
      }

    case 'CHANGE_FLAT_NUMBER':
      return {
        ...state,
        number: action.payload.number,
      }

    case 'CHANGE_USE_CUSTOM_SETTINGS':
      return {
        ...state,
        useCustomSettings: !state.useCustomSettings,
      }

    case 'CHANGE_BLOCK_CALLS':
      return {
        ...state,
        blockCalls: !state.blockCalls,
      }

    case 'CHANGE_FLAT_MIN_LINE_THRESHOLDS_NUMBER':
      return {
        ...state,
        lineThresholds: {
          ...state.lineThresholds,
          min: action.payload.min,
        }
      }

    case 'CHANGE_FLAT_MAX_LINE_THRESHOLDS_NUMBER':
      return {
        ...state,
        lineThresholds: {
          ...state.lineThresholds,
          max: action.payload.max,
        }
      }

    case 'CHANGE_SIP_ACCOUNTS_SERVER':
      return {
        ...state,
        sipAccounts: {
          ...state.sipAccounts,
          server: action.payload.server
        }
      }

    case 'CHANGE_SIP_ACCOUNTS_LOGIN':
      return {
        ...state,
        sipAccounts: {
          ...state.sipAccounts,
          login: action.payload.login
        }
      }

    case 'REQUEST_UPDATE_FLAT_SETTINGS':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_UPDATE_FLAT_SETTINGS_SUCCESS':
      showSuccessMessage('Настройки квартиры успешно сохранены')
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_UPDATE_FLAT_SETTINGS_ERROR':
      showErrorMessage('Не удалось сохранить настройки квартиры, попробуйте еще раз')
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_RESET_ALL_FLATS_SETTINGS':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_RESET_ALL_FLATS_SETTINGS_SUCCESS': 
      showSuccessMessage('Настройки всех квартиры сброшены')
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_RESET_ALL_FLATS_SETTINGS_ERROR': 
      showErrorMessage('Не удалось сбросить настройки, попробуйте еще раз')
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_ADD_FLAT_SIP_ACCOUNT':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_ADD_FLAT_SIP_ACCOUNT_SUCCESS':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_ADD_FLAT_SIP_ACCOUNT_ERROR':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS_SUCCESS':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS_ERROR':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_DELETE_FLAT_SIP_ACCOUNT':
      return {
        ...state,
        isFlatLoading: true,
      }

    case 'REQUEST_DELETE_FLAT_SIP_ACCOUNT_SUCCESS':
      return {
        ...state,
        isFlatLoading: false,
      }

    case 'REQUEST_DELETE_FLAT_SIP_ACCOUNT_ERROR':
      return {
        ...state,
        isFlatLoading: false,
      }

    default:
      return state
  }
}

export default MainSettingsReducer
