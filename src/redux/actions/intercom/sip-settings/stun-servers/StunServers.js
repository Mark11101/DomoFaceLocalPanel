export const requestStunServers = () => {

  return {
    type: 'REQUEST_STUN_SERVERS'
  }
}

export const requestStunServersSuccess = (response) => {

  return {
    type: 'REQUEST_STUN_SERVERS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestStunServersError = (error) => {

  return {
    type: 'REQUEST_STUN_SERVERS_ERROR',
    error,
  }
}

export const requestAddStunServer = (newStunServer) => {

  return {
    type: 'REQUEST_ADD_STUN_SERVER',
    payload: {
      newStunServer
    }
  }
}

export const requestAddStunServerSuccess = (response) => {

  return {
    type: 'REQUEST_ADD_STUN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestAddStunServerError = (error) => {

  return {
    type: 'REQUEST_ADD_STUN_SERVER_ERROR',
    error,
  }
}

export const requestDeleteAllStunServers = () => {

  return {
    type: 'REQUEST_DELETE_ALL_STUN_SERVERS'
  }
}

export const requestDeleteAllStunServersSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_STUN_SERVERS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllStunServersError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_STUN_SERVERS_ERROR',
    error,
  }
}

export const requestDeleteStunServer = (id) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteStunServerSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteStunServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER_ERROR',
    error,
  }
}
