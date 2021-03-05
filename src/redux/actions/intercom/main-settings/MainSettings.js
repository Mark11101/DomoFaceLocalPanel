export const toggleIntercomSettingsWasReseted = () => {

  return {
    type: 'TOGGLE_INTERCOM_SETTINGS_WAS_RESETED'
  }
}

export const changeCommutatorType = (commutatorType) => {

  return {
    type: 'CHANGE_COMMUTATOR_TYPE',
    payload: {
      commutatorType
    }
  }
}

export const changeTimeZone = (timeZone) => {

  return {
    type: 'CHANGE_TIME_ZONE',
    payload: {
      timeZone
    }
  }
}

export const changeDatetime = (datetime) => {
  
  return {
    type: 'CHANGE_DATE_TIME',
    payload: {
      datetime
    }
  }
}

export const changeNtpEnabled = () => {

  return {
    type: 'CHANGE_NTP_ENABLED'
  }
}

export const changeNtpServer = (server) => {

  return {
    type: 'CHANGE_NTP_SERVER',
    payload: {
      server
    }
  }
}

export const changeCollectKey = () => {
  
  return {
    type: 'CHANGE_COLLECT_KEY',
  }
}

export const changeFlatsFirstNumber = (firstNumber) => {

  return {
    type: 'CHANGE_FLATS_FIRST_NUMBER',
    payload: {
      firstNumber
    }
  }
}

export const changeFlatsLastNumber = (lastNumber) => {

  return {
    type: 'CHANGE_FLATS_LAST_NUMBER',
    payload: {
      lastNumber
    }
  }
}

export const changeMinLineThresholdsNumber = (min) => {

  return {
    type: 'CHANGE_INTERCOM_MIN_LINE_THRESHOLDS_NUMBER',
    payload: {
      min
    }
  }
}

export const changeMaxLineThresholdsNumber = (max) => {

  return {
    type: 'CHANGE_INTERCOM_MAX_LINE_THRESHOLDS_NUMBER',
    payload: {
      max
    }
  }
}

export const changeRingDuration = (ring) => {

  return {
    type: 'CHANGE_RING_DURATION',
    payload: {
      ring
    }
  }
}

export const changeCallDuration = (call) => {

  return {
    type: 'CHANGE_CALL_DURATION',
    payload: {
      call
    }
  }
}

export const changeDoorOpenDuration = (doorOpen) => {

  return {
    type: 'CHANGE_DOOR_OPEN_DURATION',
    payload: {
      doorOpen
    }
  }
}

export const changeFaceRecognitionThreshold = (faceRecognitionThreshold) => {

  return {
    type: 'CHANGE_FACE_RECOGNITION_THRESHOLD',
    payload: {
      faceRecognitionThreshold
    }
  }
}
