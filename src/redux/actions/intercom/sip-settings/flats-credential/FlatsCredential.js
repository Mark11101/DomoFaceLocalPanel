export const requestFlatsCredential = () => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL'
  }
}

export const requestFlatsCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestFlatsCredentialError = (error) => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL_ERROR',
    error
  }
}

export const requestUpdateFlatsCredential = (values) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL',
    payload: {
      values
    }
  }
}

export const requestUpdateFlatsCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFlatsCredentialError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL_ERROR',
    error
  }
}

export const requestResetFlatsCredential = () => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL',
  }
}

export const requestResetFlatsCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetFlatsCredentialError = (error) => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL_ERROR',
    error
  }
}

export const requestFlatsCredentialTurn = () => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL_TURN'
  }
}

export const requestFlatsCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestFlatsCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_FLATS_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const requestUpdateFlatsCredentialTurn = (values) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN',
    payload: {
      values
    }
  }
}

export const requestUpdateFlatsCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFlatsCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FLATS_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const requestResetFlatsCredentialTurn = () => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL_TURN',
  }
}

export const requestResetFlatsCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetFlatsCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_RESET_FLATS_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const changeServer = (server) => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_SERVER',
    payload: {
      server
    }
  }
}

export const changeLogin = (login) => {
  
  return {
    type: 'CHANGE_FLATS_CREDENTIAL_LOGIN',
    payload: {
      login
    }
  }
}

export const changePassword = (password) => {
  
  return {
    type: 'CHANGE_FLATS_CREDENTIAL_PASSWORD',
    payload: {
      password
    }
  }
}

export const changeUseStun = () => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_USE_STUN'
  }
}

export const changeUseStunMedia = () => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_USE_STUN_MEDIA'
  }
}

export const changeUseIce = () => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_USE_ICE'
  }
}

export const changeUseTurn = () => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_USE_TURN'
  }
}

export const changeTurnServerServer = (server) => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_TURN_SERVER_SERVER',
    payload: {
      server
    }
  }
}

export const changeTurnServerConnectionType = (connectionType) => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_TURN_SERVER_CONNECTION_TYPE',
    payload: {
      connectionType    
    }
  }
}

export const changeTurnServerLogin = (login) => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_TURN_SERVER_LOGIN',
    payload: {
      login
    }
  }
}

export const changeTurnServerPassword = (password) => {

  return {
    type: 'CHANGE_FLATS_CREDENTIAL_TURN_SERVER_PASSWORD',
    payload: {
      password
    }
  }
}
