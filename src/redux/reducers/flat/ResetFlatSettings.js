import {
    showSuccessMessage,
    showErrorMessage,
  } from '../../../utils/notifications/messages'
  
  export const initialState = {}
  
  const ResetSettingsReducer = (state = initialState, action) => {
    switch(action.type) {  
    case 'REQUEST_RESET_FLAT_SETTINGS_SUCCESS': 
        showSuccessMessage('Настройки квартиры сброшены')
        return state

    case 'REQUEST_RESET_FLAT_SETTINGS_ERROR': 
        showErrorMessage('Не удалось сбросить настройки, попробуйте еще раз')
        return state
  
      default:
        return state
    }
  }
  
  export default ResetSettingsReducer
  