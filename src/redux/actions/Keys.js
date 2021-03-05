export const requestKeys = () => {

  return {
    type: 'REQUEST_KEYS'
  }
}

export const requestKeysSuccess = (response) => {

  return {
    type: 'REQUEST_KEYS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestKeysError = (error) => {

  return {
    type: 'REQUEST_KEYS_ERROR',
    error,
  }
}

export const requestAddKey = (flatNumber, key) => {

  return {
    type: 'REQUEST_ADD_KEY',
    payload: {
      flatNumber,
      key,
    }
  }
}

export const requestAddKeySuccess = (response) => {

  return {
    type: 'REQUEST_ADD_KEY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestAddKeyError = (error) => {

  return {
    type: 'REQUEST_ADD_KEY_ERROR',
    error,
  }
}

export const requestDeleteAllKeys = (flatNumber) => {

  return {
    type: 'REQUEST_DELETE_ALL_KEYS',
    payload: {
      flatNumber
    }
  }
}

export const requestDeleteAllKeysSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_KEYS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllKeysError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_KEYS_ERROR',
    error,
  }
}

export const requestDeleteKey = (id) => {
  
  return {
    type: 'REQUEST_DELETE_KEY',
    payload: {
      id
    }
  }
}

export const requestDeleteKeySuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_KEY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteKeyError = (error) => {

  return {
    type: 'REQUEST_DELETE_KEY_ERROR',
    error,
  }
}

export const requestPinCodes = () => {

  return {
    type: 'REQUEST_PIN_CODES'
  }
}

export const requestPinCodesSuccess = (response) => {

  return {
    type: 'REQUEST_PIN_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestPinCodesError = (error) => {

  return {
    type: 'REQUEST_PIN_CODES_ERROR',
    error,
  }
}

export const requestAddPinCode = (flatNumber, code) => {

  return {
    type: 'REQUEST_ADD_PIN_CODE',
    payload: {
      flatNumber,
      code
    }
  }
}

export const requestAddPinCodeSuccess = (response) => {

  return {
    type: 'REQUEST_ADD_PIN_CODE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestAddPinCodeError = (error) => {

  return {
    type: 'REQUEST_ADD_PIN_CODE_ERROR',
    error,
  }
}

export const requestDeleteAllPinCodes = (flatNumber) => {

  return {
    type: 'REQUEST_DELETE_ALL_PIN_CODES',
    payload: {
      flatNumber
    }
  }
}

export const requestDeleteAllPinCodesSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_PIN_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllPinCodesError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_PIN_CODES_ERROR',
    error,
  }
}

export const requestDeletePinCode = (id) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE',
    payload: {
      id
    }
  }
}

export const requestDeletePinCodeSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeletePinCodeError = (error) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE_ERROR',
    error,
  }
}

export const requestQrCodes = () => {

  return {
    type: 'REQUEST_QR_CODES'
  }
}

export const requestQrCodesSuccess = (response) => {

  return {
    type: 'REQUEST_QR_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestQrCodesError = (error) => {

  return {
    type: 'REQUEST_QR_CODES_ERROR',
    error,
  }
}

export const requestAddQrCode = (flatNumber, code) => {

  return {
    type: 'REQUEST_ADD_QR_CODE',
    payload: {
      flatNumber,
      code
    }
  }
}

export const requestAddQrCodeSuccess = (response) => {

  return {
    type: 'REQUEST_ADD_QR_CODE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestAddQrCodeError = (error) => {

  return {
    type: 'REQUEST_ADD_QR_CODE_ERROR',
    error,
  }
}

export const requestDeleteAllQrCodes = (flatNumber) => {

  return {
    type: 'REQUEST_DELETE_ALL_QR_CODES',
    payload: {
      flatNumber
    }
  }
}

export const requestDeleteAllQrCodesSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_QR_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllQrCodesError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_QR_CODES_ERROR',
    error,
  }
}

export const requestDeleteQrCode = (id) => {

  return {
    type: 'REQUEST_DELETE_QR_CODE',
    payload: {
      id
    }
  }
}

export const requestDeleteQrCodeSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_QR_CODE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteQrCodeError = (error) => {

  return {
    type: 'REQUEST_DELETE_QR_CODE_ERROR',
    error,
  }
}

export const requestDownloadKeys = () => {

  return {
    type: 'REQUEST_DOWNLOAD_KEYS'
  }
}

export const requestDownloadKeysSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_KEYS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadKeysError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_KEYS_ERROR',
    error,
  }
}

export const requestLoadKeys = (file) => {

  return {
    type: 'REQUEST_LOAD_KEYS',
    payload: {
      file
    }
  }
}

export const requestLoadKeysSuccess = (response) => {

  return {
    type: 'REQUEST_LOAD_KEYS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestLoadKeysError = (error) => {

  return {
    type: 'REQUEST_LOAD_KEYS_ERROR',
    error,
  }
}

export const requestDownloadPinCodes = () => {

  return {
    type: 'REQUEST_DOWNLOAD_PIN_CODES'
  }
}

export const requestDownloadPinCodesSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_PIN_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadPinCodesError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_PIN_CODES_ERROR',
    error,
  }
}

export const requestLoadPinCodes = (file) => {

  return {
    type: 'REQUEST_LOAD_PIN_CODES',
    payload: {
      file
    }
  }
}

export const requestLoadPinCodesSuccess = (response) => {

  return {
    type: 'REQUEST_LOAD_PIN_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestLoadPinCodesError = (error) => {

  return {
    type: 'REQUEST_LOAD_PIN_CODES_ERROR',
    error,
  }
}

export const requestDownloadQrCodes = () => {

  return {
    type: 'REQUEST_DOWNLOAD_QR_CODES'
  }
}

export const requestDownloadQrCodesSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_QR_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadQrCodesError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_QR_CODES_ERROR',
    error,
  }
}

export const requestLoadQrCodes = (file) => {

  return {
    type: 'REQUEST_LOAD_QR_CODES',
    payload: {
      file
    }
  }
}

export const requestLoadQrCodesSuccess = (response) => {

  return {
    type: 'REQUEST_LOAD_QR_CODES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestLoadQrCodesError = (error) => {

  return {
    type: 'REQUEST_LOAD_QR_CODES_ERROR',
    error,
  }
}
