export const requestIntercomInfo = () => {

  return {
    type: 'REQUEST_INTERCOM_INFO'
  }
}

export const requestIntercomInfoSuccess = (response) => {

  return {
    type: 'REQUEST_INTERCOM_INFO_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestIntercomInfoError = (error) => {

  return {
    type: 'REQUEST_INTERCOM_INFO_ERROR',
    error
  }
}

export const requestIntercomSettings = () => {

  return {
    type: 'REQUEST_INTERCOM_SETTINGS'
  }
}

export const requestIntercomSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_INTERCOM_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestIntercomSettingsError = (error) => {

  return {
    type: 'REQUEST_INTERCOM_SETTINGS_ERROR',
    error
  }
}

export const requestLineSignal = (flatNumber, type) => {

  return {
    type: 'REQUEST_LINE_SIGNAL',
    payload: {
      flatNumber,
      type,
    }
  }
}

export const requestLineSignalSuccess = (response, type) => {

  return {
    type: 'REQUEST_LINE_SIGNAL_SUCCESS',
    payload: {
      response,
      type,
    }
  }
}

export const requestLineSignalError = (error) => {

  return {
    type: 'REQUEST_LINE_SIGNAL_ERROR',
    error,
  }
}

export const requestOpenDoor = () => {

  return {
    type: 'REQUEST_OPEN_DOOR'
  }
}

export const requestOpenDoorSuccess = (response) => {

  return {
    type: 'REQUEST_OPEN_DOOR_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestOpenDoorError = (error) => {

  return {
    type: 'REQUEST_OPEN_DOOR_ERROR',
    error,
  }
}

export const requestResetSetiings = () => {

  return {
    type: 'REQUEST_RESET_SETTINGS'
  }
}

export const requestResetSetiingsSuccess = (response) => {

  return {
    type: 'REQUEST_RESET_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResetSetiingsError = (error) => {

  return {
    type: 'REQUEST_RESET_SETTINGS_ERROR',
    error
  }
}

export const requestUpdateIntercomSettings = (values) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_SETTINGS',
    payload: {
      values
    }
  }
}

export const requestUpdateIntercomSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateIntercomSettingsError = (error) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_SETTINGS_ERROR',
    error,
  }
}

export const requestRebootIntercom = () => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM'
  }
}

export const requestRebootIntercomSuccess = () => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM_SUCCESS'
  }
}

export const requestRebootIntercomError = () => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM_ERROR'
  }
}

export const requestDownloadSettings = () => {

  return {
    type: 'REQUEST_DOWNLOAD_SETTINGS'
  }
}

export const requestDownloadSettingsSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadSettingsError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_SETTINGS_ERROR',
    error,
  }
}

export const requestLoadSettings = (file) => {

  return {
    type: 'REQUEST_LOAD_SETTINGS',
    payload: {
      file
    }
  }
}

export const requestLoadSettingsSuccess = (response) => {

  document.location.reload();

  return {
    type: 'REQUEST_LOAD_SETTINGS_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestLoadSettingsError = (error) => {

  return {
    type: 'REQUEST_LOAD_SETTINGS_ERROR',
    error,
  }
}

export const requestUpdateFirmware = (file) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE',
    payload: {
      file
    }
  }
}

export const requestUpdateFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFirmwareError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE_ERROR',
    error,
  }
}

export const changeSyslogServerEnabled = () => {

  return {
    type: 'CHANGE_SYS_LOG_SERVER_ENABLED'
  }
}

export const changeSysServer = (server) => {

  return {
    type: 'CHANGE_SYS_SERVER',
    payload: {
      server
    }
  }
}

export const changeSysConnectionType = (type) => {

  return {
    type: 'CHANGE_SYS_CONNECTION_TYPE',
    payload: {
      type
    }
  }
}
