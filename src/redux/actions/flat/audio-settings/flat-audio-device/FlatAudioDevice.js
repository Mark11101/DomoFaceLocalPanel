export const changeGain = (gain) => {

  return {
    type: 'CHANGE_FLAT_FLAT_MICROPHONE_GAIN',
    payload: {
      gain
    }
  }
}

export const changeAgcMode = () => {

  return {
    type: 'CHANGE_FLAT_FLAT_MICROPHONE_AGC_MODE'
  }
}

export const changeAgcModeMaxGain = (agcModeMaxGain) => {

  return {
    type: 'CHANGE_FLAT_FLAT_MICROPHONE_AGC_MODE_MAX_GAIN',
    payload: {
      agcModeMaxGain
    }
  }
}

export const changeAgcModeTargetLevel = (agcModeTargetLevel) => {

  return {
    type: 'CHANGE_FLAT_FLAT_MICROPHONE_AGC_MODE_TARGET_LEVEL',
    payload: {
      agcModeTargetLevel
    }
  }
}

export const changeSfxGain = (sfxGain) => {

  return {
    type: 'CHANGE_FLAT_FLAT_SPEAKER_SFX_GAIN',
    payload: {
      sfxGain
    }
  }
}

export const changeIntercomGain = (intercomGain) => {

  return {
    type: 'CHANGE_FLAT_FLAT_SPEAKER_INTERCOM_GAIN',
    payload: {
      intercomGain
    }
  }
}
