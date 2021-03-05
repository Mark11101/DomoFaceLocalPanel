export const toggleFlatSettingsWasReseted = () => {

  return {
    type: 'TOGGLE_FLAT_SETTINGS_WAS_RESETED'
  }
}

export const changeNumber = (number) => {

  return {
    type: 'CHANGE_FLAT_NUMBER',
    payload: {
      number
    }
  }
}

export const changeUseCustomSettings = () => {

  return {
    type: 'CHANGE_USE_CUSTOM_SETTINGS'
  }
}

export const changeBlockCalls = () => {

  return {
    type: 'CHANGE_BLOCK_CALLS'
  }
}

export const changeFlatLineThresholdsMinNumber = (min) => {

  return {
    type: 'CHANGE_FLAT_MIN_LINE_THRESHOLDS_NUMBER',
    payload: {
      min
    }
  }
}

export const changeFlatLineThresholdsMaxNumber = (max) => {

  return {
    type: 'CHANGE_FLAT_MAX_LINE_THRESHOLDS_NUMBER',
    payload: {
      max
    }
  }
}

export const changeSipAccountsServer = (server) => {

  return {
    type: 'CHANGE_SIP_ACCOUNTS_SERVER',
    payload: {
      server
    }
  }
}

export const changeSipAccountsLogin = (login) => {

  return {
    type: 'CHANGE_SIP_ACCOUNTS_LOGIN',
    payload: {
      login
    }
  }
}
