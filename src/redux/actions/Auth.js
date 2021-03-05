export const requestSignIn = (login, password) => {

  return {
    type: 'SIGN_IN',
    payload: {
      login,
      password,
    }
  }
}

export const requestSignInSuccess = (login) => {

  return {
    type: 'SIGN_IN_SUCCESS',
    payload: {
      login
    }
  }
}

export const requestSignInError = (error) => {

  return {
    type: 'SIGN_IN_ERROR',
    error
  }
}

export const logOut = () => {

  return {
    type: 'LOG_OUT',
  }
}

export const requestIntercomHealthCheck = () => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK'
  }
}

export const requestIntercomHealthCheckSuccess = () => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK_SUCCESS'
  }
}

export const requestIntercomHealthCheckError = () => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK_ERROR'
  }
}
