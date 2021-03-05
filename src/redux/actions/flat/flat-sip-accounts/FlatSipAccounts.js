export const requestFlatSipAccounts = (number) => {

    return {
      type: 'REQUEST_FLAT_SIP_ACCOUNTS',
      payload: {
        number
      }
    }
  }
  
  export const requestFlatSipAccountsSuccess = (response) => {
  
    return {
      type: 'REQUEST_FLAT_SIP_ACCOUNTS_SUCCESS',
      payload: {
        response
      }
    }
  }
  
  export const requestFlatSipAccountsError = (error) => {
  
    return {
      type: 'REQUEST_FLAT_SIP_ACCOUNTS_ERROR',
      error,
    }
  }
  
  export const requestAddFlatSipAccount = (number, server, login) => {
  
    return {
      type: 'REQUEST_ADD_FLAT_SIP_ACCOUNT',
      payload: {
        number,
        server,
        login,
      }
    }
  }
  
  export const requestAddFlatSipAccountSuccess = (response) => {
  
    return {
      type: 'REQUEST_ADD_FLAT_SIP_ACCOUNT_SUCCESS',
      payload: {
        response
      }
    }
  }
  
  export const requestAddFlatSipAccountError = (error) => {
  
    return {
      type: 'REQUEST_ADD_FLAT_SIP_ACCOUNT_ERROR',
      error,
    }
  }
  
  export const requestDeleteAllFlatSipAccounts = (number) => {

    return {
      type: 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS',
      payload: {
        number
      }
    }
  }
  
  export const requestDeleteAllFlatSipAccountsSuccess = (number) => {
   
    return {
      type: 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS_SUCCESS',
      payload: {
        number
      }
    }
  }
  
  export const requestDeleteAllFlatSipAccountsError = (error) => {
  
    return {
      type: 'REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS_ERROR',
      error,
    }
  }
  
  export const requestDeleteFlatSipAccount = (id, number) => {
  
    return {
      type: 'REQUEST_DELETE_FLAT_SIP_ACCOUNT',
      payload: {
        id,
        number,
      }
    }
  }
  
  export const requestDeleteFlatSipAccountSuccess = (number) => {
  
    return {
      type: 'REQUEST_DELETE_FLAT_SIP_ACCOUNT_SUCCESS',
      payload: {
        number
      }
    }
  }
  
  export const requestDeleteFlatSipAccountError = (error) => {
  
    return {
      type: 'REQUEST_DELETE_FLAT_SIP_ACCOUNT_ERROR',
      error,
    }
  }
  