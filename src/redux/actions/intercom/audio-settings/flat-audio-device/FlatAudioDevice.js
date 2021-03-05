export const changeMicrophoneGain = (gain) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_MICROPHONE_GAIN',
    payload: {
      gain
    }
  }
}

export const changeMicrophoneAgcMode = (agcMode) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_MICROPHONE_AGC_MODE',
    payload: {
      agcMode
    }
  }
}

export const changeMicrophoneAgcModeMaxGain = (agcModeMaxGain) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_MICROPHONE_AGC_MODE_MAX_GAIN',
    payload: {
      agcModeMaxGain
    }
  }
}

export const changeMicrophoneAgcModeTargetLevel = (agcModeTargetLevel) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_MICROPHONE_AGC_MODE_TARGET_LEVEL',
    payload: {
      agcModeTargetLevel
    }
  }
}

export const changeSpeakerSfxGain = (sfxGain) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_SPEAKER_SFX_GAIN',
    payload: {
      sfxGain
    }
  }
}

export const changeSpeakerIntercomGain = (intercomGain) => {

  return {
    type: 'CHANGE_INTERCOM_FLAT_SPEAKER_INTERCOM_GAIN',
    payload: {
      intercomGain
    }
  }
}
