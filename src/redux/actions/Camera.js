export const requestCameraRtsp = () => {

  return {
    type: 'REQUEST_CAMERA_RTSP'
  }
}

export const requestCameraRtspSuccess = (response) => {

  return {
    type: 'REQUEST_CAMERA_RTSP_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCameraRtspError = (error) => {

  return {
    type: 'REQUEST_CAMERA_RTSP_ERROR',
    error
  }
}

export const requestCameraSnapshot = () => {

  return {
    type: 'REQUEST_CAMERA_SNAPSHOT'
  }
}

export const requestCameraSnapshotSuccess = (response) => {

  return {
    type: 'REQUEST_CAMERA_SNAPSHOT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCameraSnapshotError = (error) => {

  return {
    type: 'REQUEST_CAMERA_SNAPSHOT_ERROR',
    error
  }
}

export const requestDisableIrCut = () => {

  return {
    type: 'REQUEST_DISABLE_IR_CUT',
  }
}

export const requestDisableIrCutSuccess = (response) => {

  return {
    type: 'REQUEST_DISABLE_IR_CUT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDisableIrCutError = (error) => {

  return {
    type: 'REQUEST_DISABLE_IR_CUT_ERROR',
    error,
  }
}

export const requestEnableIrCut = () => {

  return {
    type: 'REQUEST_ENABLE_IR_CUT',
  }
}

export const requestEnableIrCutSuccess = (response) => {

  return {
    type: 'REQUEST_ENABLE_IR_CUT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestEnableIrCutError = (error) => {

  return {
    type: 'REQUEST_ENABLE_IR_CUT_ERROR',
    error,
  }
}
