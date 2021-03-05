export const changeMicrophoneGain = (gain) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_GAIN',
    payload: {
      gain
    }
  }
}

export const changeMicrophoneAgcMode = () => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE'
  }
}

export const changeMicrophoneAgcModeMaxGain = (agcModeMaxGain) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE_MAX_GAIN',
    payload: {
      agcModeMaxGain
    }
  }
}

export const changeMicrophoneAgcModeTargetLevel = (agcModeTargetLevel) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE_TARGET_LEVEL',
    payload: {
      agcModeTargetLevel
    }
  }
}

export const changeSpeakerSfxGain = (sfxGain) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_SPEAKER_SFX_GAIN',
    payload: {
      sfxGain
    }
  }
}

export const changeSpeakerFlatGain = (flatGain) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_SPEAKER_FLAT_GAIN',
    payload: {
      flatGain
    }
  }
}

export const changeSpeakerSipGain = (sipGain) => {

  return {
    type: 'CHANGE_INTERCOM_INTERCOM_SPEAKER_SIP_GAIN',
    payload: {
      sipGain
    }
  }
}
