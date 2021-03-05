export const requestEmergencySipAccounts = () => {

  return {
    type: 'REQUEST_EMERGENCY_SIP_ACCOUNTS'
  }
}

export const requestEmergencySipAccountsSuccess = (response) => {

  return {
    type: 'REQUEST_EMERGENCY_SIP_ACCOUNTS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestEmergencySipAccountsError = (error) => {

  return {
    type: 'REQUEST_EMERGENCY_SIP_ACCOUNTS_ERROR',
    error,
  }
}

export const requestAddEmergencySipAccount = (server, login) => {

  return {
    type: 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT',
    payload: {
      server,
      login,
    }
  }
}

export const requestAddEmergencySipAccountSuccess = (response) => {

  return {
    type: 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestAddEmergencySipAccountError = (error) => {

  return {
    type: 'REQUEST_ADD_EMERGENCY_SIP_ACCOUNT_ERROR',
    error,
  }
}

export const requestDeleteAllEmergencySipAccounts = () => {

  return {
    type: 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS'
  }
}

export const requestDeleteAllEmergencySipAccountsSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllEmergencySipAccountsError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS_ERROR',
    error,
  }
}

export const requestDeleteEmergencySipAccount = (id) => {

  return {
    type: 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT',
    payload: {
      id
    }
  }
}

export const requestDeleteEmergencySipAccountSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteEmergencySipAccountError = (error) => {

  return {
    type: 'REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT_ERROR',
    error,
  }
}
