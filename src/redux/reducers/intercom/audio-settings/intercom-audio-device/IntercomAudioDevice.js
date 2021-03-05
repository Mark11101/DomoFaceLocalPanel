export const initialState = {
  microphone: {
    gain:               '0',
    agcMode:            true,
    agcModeMaxGain:     '0',
    agcModeTargetLevel: '0',
  },
  speaker: {
    sfxGain:  '0',
    flatGain: '0',
    sipGain:  '0',
  }
}

const IntercomAudioDeviceReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.intercomAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.intercomAudioDevice.speaker,
      }

    case 'REQUEST_RESET_SETTINGS_SUCCESS':
      return {
        ...state,
        microphone: action.payload.response.audioSettings.intercomAudioDevice.microphone,
        speaker: action.payload.response.audioSettings.intercomAudioDevice.speaker,
      }

    case 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          gain: action.payload.gain
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcMode: !state.microphone.agcMode,
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE_MAX_GAIN':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeMaxGain: action.payload.agcModeMaxGain
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_MICROPHONE_AGC_MODE_TARGET_LEVEL':
      return {
        ...state,
        microphone: {
          ...state.microphone,
          agcModeTargetLevel: action.payload.agcModeTargetLevel
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_SPEAKER_SFX_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          sfxGain: action.payload.sfxGain
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_SPEAKER_FLAT_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          flatGain: action.payload.flatGain
        }
      }
    case 'CHANGE_INTERCOM_INTERCOM_SPEAKER_SIP_GAIN':
      return {
        ...state,
        speaker: {
          ...state.speaker,
          sipGain: action.payload.sipGain
        }
      }
    default:
      return state
  }
}

export default IntercomAudioDeviceReducer
