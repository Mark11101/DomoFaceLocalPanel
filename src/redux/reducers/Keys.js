import { showErrorMessage } from '../../utils/notifications/messages'

export const initialState = {
  keys: [],
  pinCodes: [],
  qrCodes: [],
  isKeysLoading: false,
  isPinCodesLoading: false,
  isQrCodesLoading: false,
}

const KeysReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_KEYS':
      return {
        ...state,
        isKeysLoading: true
      } 

    case 'REQUEST_PIN_CODES':
      return {
        ...state,
        isPinCodesLoading: true
      } 

    case 'REQUEST_QR_CODES':
      return {
        ...state,
        isQrCodesLoading: true
      } 

    case 'REQUEST_KEYS_SUCCESS':
      return {
        ...state,
        keys: action.payload.response,  
        isKeysLoading: false
      } 

    case 'REQUEST_KEYS_ERROR':
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_ADD_KEY':
      return {
        ...state,
        isKeysLoading: true,      
      }

    case 'REQUEST_LOAD_KEYS':
      return {
        ...state,
        isKeysLoading: true,
      }

    case 'REQUEST_LOAD_KEYS_ERROR':
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_DELETE_KEY':
      return {
        ...state,
        isKeysLoading: true,
      }

    case 'REQUEST_DELETE_ALL_KEYS':
      return {
        ...state,
        isKeysLoading: true,
      }

    case 'REQUEST_DOWNLOAD_KEYS':
      return {
        ...state,
        isKeysLoading: true,
      }  
      
    case 'REQUEST_DOWNLOAD_KEYS_SUCCESS':
      return {
        ...state,
        isKeysLoading: false,
      }  
    
    case 'REQUEST_DOWNLOAD_KEYS_ERROR':
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_ADD_KEY_SUCCESS':
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_ADD_KEY_ERROR':
      showErrorMessage('Не удалось добавить ключ, попробуйте еще раз')
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_DELETE_ALL_KEYS_ERROR':
      showErrorMessage('Не удалось удалить ключи, попробуйте еще раз')
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_DELETE_KEY_ERROR':
      showErrorMessage('Не удалось удалить ключ, попробуйте еще раз')
      return {
        ...state,
        isKeysLoading: false,
      }

    case 'REQUEST_PIN_CODES_SUCCESS':
      return {
        ...state,
        pinCodes: action.payload.response,  
        isPinCodesLoading: false,
      } 

    case 'REQUEST_PIN_CODES_ERROR':
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_ADD_PIN_CODE':
      return {
        ...state,
        isPinCodesLoading: true,      
      }

    case 'REQUEST_LOAD_PIN_CODES':
      return {
        ...state,
        isPinCodesLoading: true,
      }

    case 'REQUEST_LOAD_PIN_CODES_ERROR':
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_DELETE_PIN_CODE':
      return {
        ...state,
        isPinCodesLoading: true,
      }

    case 'REQUEST_DELETE_ALL_PIN_CODES':
      return {
        ...state,
        isPinCodesLoading: true,
      }

    case 'REQUEST_DOWNLOAD_PIN_CODES':
      return {
        ...state,
        isPinCodesLoading: true,
      }  
      
    case 'REQUEST_DOWNLOAD_PIN_CODES_SUCCESS':
      return {
        ...state,
        isPinCodesLoading: false,
      }  
    
    case 'REQUEST_DOWNLOAD_PIN_CODES_ERROR':
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_ADD_PIN_CODE_SUCCESS':
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_ADD_PIN_CODE_ERROR':
      showErrorMessage('Не удалось добавить пин-код, попробуйте еще раз')
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_DELETE_ALL_PIN_CODES_ERROR':
      showErrorMessage('Не удалось удалить пин-коды, попробуйте еще раз')
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_DELETE_PIN_CODE_ERROR':
      showErrorMessage('Не удалось удалить пин-код, попробуйте еще раз')
      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_QR_CODES_SUCCESS':
      return {
        ...state,
        qrCodes: action.payload.response,  
        isQrCodesLoading: false,
      } 

    case 'REQUEST_QR_CODES_ERROR':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_ADD_QR_CODE':
      return {
        ...state,
        isQrCodesLoading: true,      
      }

    case 'REQUEST_LOAD_QR_CODES':
      return {
        ...state,
        isQrCodesLoading: true,
      }

    case 'REQUEST_LOAD_QR_CODES_ERROR':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_DELETE_QR_CODE':
      return {
        ...state,
        isQrCodesLoading: true,
      }

    case 'REQUEST_DELETE_ALL_QR_CODES':
      return {
        ...state,
        isQrCodesLoading: true,
      }

    case 'REQUEST_DOWNLOAD_QR_CODES':
      return {
        ...state,
        isQrCodesLoading: true,
      }  
      
    case 'REQUEST_DOWNLOAD_QR_CODES_SUCCESS':
      return {
        ...state,
        isQrCodesLoading: false,
      }  
    
    case 'REQUEST_DOWNLOAD_QR_CODES_ERROR':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_ADD_QR_CODE_SUCCESS':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_ADD_QR_CODE_ERROR':
      showErrorMessage('Не удалось добавить QR-код, попробуйте еще раз')
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_DELETE_ALL_QR_CODES_ERROR':
      showErrorMessage('Не удалось удалить QR-коды, попробуйте еще раз')
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_DELETE_QR_CODE_ERROR':
      showErrorMessage('Не удалось удалить QR-код, попробуйте еще раз')
      return {
        ...state,
        isQrCodesLoading: false,
      }

    default:
      return state
  }
}

export default KeysReducer
