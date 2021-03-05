export const requestFlatSettings = (number) => {

  return {
    type: 'REQUEST_FLAT_SETTINGS',
    payload: {
      number
    }
  }
}

export const requestFlatSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_FLAT_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestFlatSettingsError = (error) => {

  return {
    type: 'REQUEST_FLAT_SETTINGS_ERROR',
    error
  }
}

export const requestUpdateFlatSettings = (values, number) => {

  return {
    type: 'REQUEST_UPDATE_FLAT_SETTINGS',
    payload: {
      values,
      number,
    }
  }
}

export const requestUpdateFlatSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FLAT_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFlatSettingsError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FLAT_SETTINGS_ERROR',
    error,
  }
}

export const requestResetFlatSettings = (number) => {

  return {
    type: 'REQUEST_RESET_FLAT_SETTINGS',
    payload: {
      number
    }
  }
}

export const requestResetFlatSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_FLAT_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetFlatSettingsError = (error) => {

  return {
    type: 'REQUEST_RESET_FLAT_SETTINGS_ERROR',
    error,
  }
}

export const requestResetAllFlatsSettings = (choosenFlatNumber) => {

  return {
    type: 'REQUEST_RESET_ALL_FLATS_SETTINGS',
    payload: {
      choosenFlatNumber,
    }
  }
}

export const requestResetAllFlatsSettingsSuccess = (choosenFlatNumber) => {

  return {
    type: 'REQUEST_RESET_ALL_FLATS_SETTINGS_SUCCESS',
    payload: {
      choosenFlatNumber
    }
  }
}

export const requestResetAllFlatsSettingsError = (error) => {

  return {
    type: 'REQUEST_RESET_ALL_FLATS_SETTINGS_ERROR',
    error
  }
}
