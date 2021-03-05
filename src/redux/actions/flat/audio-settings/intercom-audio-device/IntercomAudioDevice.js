export const changeGain = (gain) => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_MICROPHONE_GAIN',
    payload: {
      gain
    }
  }
}

export const changeAgcMode = () => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_MICROPHONE_AGC_MODE'
  }
}

export const changeAgcModeMaxGain = (agcModeMaxGain) => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_MICROPHONE_AGC_MODE_MAX_GAIN',
    payload: {
      agcModeMaxGain
    }
  }
}

export const changeAgcModeTargetLevel = (agcModeTargetLevel) => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_MICROPHONE_AGC_MODE_TARGET_LEVEL',
    payload: {
      agcModeTargetLevel
    }
  }
}

export const changeFlatGain = (flatGain) => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_SPEAKER_FLAT_GAIN',
    payload: {
      flatGain
    }
  }
}

export const changeSipGain = (sipGain) => {

  return {
    type: 'CHANGE_FLAT_INTERCOM_SPEAKER_SIP_GAIN',
    payload: {
      sipGain
    }
  }
}
