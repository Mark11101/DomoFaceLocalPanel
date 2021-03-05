export const initialState = {
  microphone: {
    gain:               0,
    agcMode:            true,
    agcModeMaxGain:     0,
    agcModeTargetLevel: 0,
  },
  speaker: {
    sfxGain:  0,
    intercomGain: 0,
    flatGain: 0,
  }
}

const SipAudioDeviceReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.sipAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.sipAudioDevice.speaker,
      }

    case 'REQUEST_RESET_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.sipAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.sipAudioDevice.speaker,
      }

    case 'CHANGE_INTERCOM_SIP_MICROPHONE_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          gain: Number(action.payload.gain),
        }
      }
    case 'CHANGE_INTERCOM_SIP_MICROPHONE_AGC_MODE':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcMode: !state.microphone.agcMode,
        }
      }
    case 'CHANGE_INTERCOM_SIP_MICROPHONE_AGC_MODE_MAX_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeMaxGain: Number(action.payload.agcModeMaxGain),
        }
      }
    case 'CHANGE_INTERCOM_SIP_MICROPHONE_AGC_MODE_TARGET_LEVEL':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeTargetLevel: Number(action.payload.agcModeTargetLevel),
        }
      }
    case 'CHANGE_INTERCOM_SIP_SPEAKER_SFX_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          sfxGain: Number(action.payload.sfxGain),
        }
      }
    case 'CHANGE_INTERCOM_SIP_SPEAKER_INTERCOM_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          intercomGain: Number(action.payload.intercomGain),
        }
      }
    case 'CHANGE_INTERCOM_SIP_SPEAKER_FLAT_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          flatGain: Number(action.payload.flatGain),
        }
      }
    default:
      return state
  }
}

export default SipAudioDeviceReducer
