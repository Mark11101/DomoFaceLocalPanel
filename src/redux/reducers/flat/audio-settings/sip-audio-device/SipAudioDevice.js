export const initialState = {
  microphone: {
    gain:               '0',
    agcMode:            true,
    agcModeMaxGain:     '0',
    agcModeTargetLevel: '0',
  },
  speaker: {
    intercomGain: '0',
  }
}

const SipAudioSettingsReducer = (state = initialState, action) => {
  switch(action.type) {    
    case 'REQUEST_FLAT_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.sipAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.sipAudioDevice.speaker,
      }

    case 'REQUEST_RESET_FLAT_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.sipAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.sipAudioDevice.speaker,
      }

    case 'CHANGE_FLAT_SIP_MICROPHONE_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          gain: action.payload.gain,
        }
      }

    case 'CHANGE_FLAT_SIP_MICROPHONE_AGC_MODE':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcMode: !state.microphone.agcMode,
        }
      }

    case 'CHANGE_FLAT_SIP_MICROPHONE_AGC_MODE_MAX_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeMaxGain: action.payload.agcModeMaxGain,
        }
      }

    case 'CHANGE_FLAT_SIP_MICROPHONE_AGC_MODE_TARGET_LEVEL':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeTargetLevel: action.payload.agcModeTargetLevel,
        }
      }

    case 'CHANGE_FLAT_SIP_SPEAKER_SFX_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          sfxGain: action.payload.sfxGain,
        }
      }

    case 'CHANGE_FLAT_SIP_SPEAKER_INTERCOM_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          intercomGain: action.payload.intercomGain,
        }
      }

    case 'CHANGE_FLAT_SIP_SPEAKER_FLAT_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          flatGain: action.payload.flatGain,
        }
      }
    
    default:
      return state
  }
}

export default SipAudioSettingsReducer
