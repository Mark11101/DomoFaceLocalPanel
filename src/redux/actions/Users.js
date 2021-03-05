export const requestUsers = () => {

  return {
    type: 'REQUEST_USERS'
  }
}

export const requestUsersSuccess = (response) => {

  return {
    type: 'REQUEST_USERS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUsersError = (error) => {

  return {
    type: 'REQUEST_USERS_ERROR',
    error,
  }
}

export const requestCurrentUser = () => {

  return {
    type: 'REQUEST_CURRENT_USER'
  }
}

export const requestCurrentUserSuccess = (currentUser) => {

  return {
    type: 'REQUEST_CURRENT_USER_SUCCESS',
    payload: {
      currentUser
    }
  }
}

export const requestCurrentUserError = (error) => {

  return {
    type: 'REQUEST_CURRENT_USER_ERROR',
    error,
  }
}

export const requestUpdateUser = (id, values) => {

  return {
    type: 'REQUEST_UPDATE_USER',
    payload: {
      id,
      values,
    }
  }
}

export const requestUpdateUserSuccess = (response, login) => {

  return {
    type: 'REQUEST_UPDATE_USER_SUCCESS',
    payload: {
      response,
      login,
    }
  }
}

export const requestUpdateUserError = (error) => {

  return {
    type: 'REQUEST_UPDATE_USER_ERROR',
    error,
  }
}

export const requestCreateUser = (values) => {

  return {
    type: 'REQUEST_CREATE_USER',
    payload: {
      values
    }
  }
}

export const requestCreateUserSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_USER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateUserError = (error) => {

  return {
    type: 'REQUEST_CREATE_USER_ERROR',
    error,
  }
}

export const requestDeleteUser = (id) => {

  return {
    type: 'REQUEST_DELETE_USER',
    payload: {
      id
    }
  }
}

export const requestDeleteUserSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_USER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteUserError = (error) => {

  return {
    type: 'REQUEST_DELETE_USER_ERROR',
    error,
  }
}

export const requestDeleteAllUsers = () => {

  return {
    type: 'REQUEST_DELETE_ALL_USERS'
  }
}

export const requestDeleteAllUsersSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_ALL_USERS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteAllUsersError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_USERS_ERROR',
    error,
  }
}
