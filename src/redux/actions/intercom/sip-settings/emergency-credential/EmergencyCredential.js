export const requestEmergencyCredential = () => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL'
  }
}

export const requestEmergencyCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestEmergencyCredentialError = (error) => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL_ERROR',
    error
  }
}

export const requestUpdateEmergencyCredential = (values) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL',
    payload: {
      values
    }
  }
}

export const requestUpdateEmergencyCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateEmergencyCredentialError = (error) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_ERROR',
    error
  }
}

export const requestResetEmergencyCredential = () => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL',
  }
}

export const requestResetEmergencyCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetEmergencyCredentialError = (error) => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL_ERROR',
    error
  }
}

export const requestEmergencyCredentialTurn = () => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL_TURN'
  }
}

export const requestEmergencyCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestEmergencyCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_EMERGENCY_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const requestUpdateEmergencyCredentialTurn = (values) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN',
    payload: {
      values
    }
  }
}

export const requestUpdateEmergencyCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateEmergencyCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const requestResetEmergencyCredentialTurn = () => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN',
  }
}

export const requestResetEmergencyCredentialTurnSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetEmergencyCredentialTurnError = (error) => {

  return {
    type: 'REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN_ERROR',
    error
  }
}

export const changeServer = (server) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_SERVER',
    payload: {
      server
    }
  }
}

export const changeLogin = (login) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_LOGIN',
    payload: {
      login
    }
  }
}

export const changePassword = (password) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_PASSWORD',
    payload: {
      password
    }
  }
}

export const changeUseStun = () => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_USE_STUN'
  }
}

export const changeUseStunMedia = () => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_USE_STUN_MEDIA'
  }
}

export const changeUseIce = () => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_USE_ICE'
  }
}

export const changeUseTurn = () => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_USE_TURN'
  }
}

export const changeTurnServerServer = (server) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_SERVER',
    payload: {
      server
    }
  }
}

export const changeTurnServerConnectionType = (connectionType) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_CONNECTION_TYPE',
    payload: {
      connectionType    
    }
  }
}

export const changeTurnServerLogin = (login) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_LOGIN',
    payload: {
      login
    }
  }
}

export const changeTurnServerPassword = (password) => {

  return {
    type: 'CHANGE_EMERGENCY_CREDENTIAL_TURN_SERVER_PASSWORD',
    payload: {
      password
    }
  }
}
