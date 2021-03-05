import CommutatorTypes from '../../../../constants/CommutatorTypes'
import { showErrorMessage } from '../../../../utils/notifications/messages'

export const initialState = {
  timeSettings: {
    datetime: '',
    ntpEnabled: false,
    ntpServer: '',
    timezone: '',
  },
  commutatorType: CommutatorTypes.METAKOM,
  collectKeysMode: false,
  flatsSettings: {
    firstNumber: '',
    lastNumber:  '',
    lineThresholds: {
      min: '',
      max: '',
    },
    lineSignal: '',
  },
  durationSettings: {
    ring: '',
    call: '',
    doorOpen: '',
  },
  faceRecognitionThreshold: '',
  isLineSignalLoading: false,
}

const MainSettingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
      return {
        ...state,
        timeSettings: action.payload.response.timeSettings,
        commutatorType: action.payload.response.commutatorType,
        collectKeysMode: action.payload.response.collectKeysMode,
        flatsSettings: action.payload.response.flatsSettings,
        durationSettings: action.payload.response.durationSettings,
        faceRecognitionThreshold: action.payload.response.faceRecognitionThreshold,
      }

    case 'REQUEST_RESET_SETTINGS_SUCCESS':
      return {
        ...state,
        commutatorType: action.payload.response.commutatorType,
        collectKeysMode: action.payload.response.collectKeysMode,
        flatsSettings: action.payload.response.flatsSettings,
        durationSettings: action.payload.response.durationSettings,
        faceRecognitionThreshold: action.payload.response.faceRecognitionThreshold,
      }

    case 'REQUEST_LINE_SIGNAL':
      return {
        ...state,
        isLineSignalLoading: true,
      }

    case 'REQUEST_LINE_SIGNAL_SUCCESS':
      return {
        ...state,
        flatsSettings: {
          ...state.flatsSettings,
          lineSignal: action.payload.response.lineSignal,
        },
        isLineSignalLoading: false,
      }

    case 'REQUEST_LINE_SIGNAL_ERROR':

      showErrorMessage('Не удалось вычислить напряжение, попробуйте еще раз')

      return {
        ...state,
        isLineSignalLoading: false,
      }

    case 'CHANGE_COMMUTATOR_TYPE':
      return {
        ...state,
        commutatorType: action.payload.commutatorType,
      }
    case 'CHANGE_TIME_ZONE':
      return {
        ...state,
        timeSettings: {
          ...state.timeSettings,
          timezone: action.payload.timeZone,
        }
      }
    case 'CHANGE_DATE_TIME':
      return {
        ...state,
        timeSettings: {
          ...state.timeSettings,
          datetime: action.payload.datetime,
        }
      }
    case 'CHANGE_NTP_ENABLED':
      return {
        ...state,
        timeSettings: {
          ...state.timeSettings,
          ntpEnabled: !state.timeSettings.ntpEnabled,
        }
      }
    case 'CHANGE_NTP_SERVER':
      return {
        ...state,
        timeSettings: {
          ...state.timeSettings,
          ntpServer: action.payload.ntpServer,
        }
      }
    case 'CHANGE_COLLECT_KEY':
      return {
        ...state,
        collectKeysMode: !state.collectKeysMode,
      }
    case 'CHANGE_FLATS_FIRST_NUMBER':
      return {
        ...state,
        flatsSettings: {
          ...state.flatsSettings,
          firstNumber: action.payload.firstNumber,
        }
      }
    case 'CHANGE_FLATS_LAST_NUMBER':
      return {
        ...state,
        flatsSettings: {
          ...state.flatsSettings,
          lastNumber: action.payload.lastNumber,
        }
      }
    case 'CHANGE_INTERCOM_MIN_LINE_THRESHOLDS_NUMBER':
      return {
        ...state,
        flatsSettings: {
          ...state.flatsSettings,
          lineThresholds: {
            ...state.flatsSettings.lineThresholds,
            min: action.payload.min,
          },
        }
      }
    case 'CHANGE_INTERCOM_MAX_LINE_THRESHOLDS_NUMBER':
      return {
        ...state,
        flatsSettings: {
          ...state.flatsSettings,
          lineThresholds: {
            ...state.flatsSettings.lineThresholds,
            max: action.payload.max,
          },
        }
      }
    case 'CHANGE_RING_DURATION':
      return {
        ...state,
        durationSettings: {
          ...state.durationSettings,
          ring: action.payload.ring,
        }
      }
    case 'CHANGE_CALL_DURATION':
      return {
        ...state,
        durationSettings: {
          ...state.durationSettings,
          call: action.payload.call,
        }
      }
    case 'CHANGE_DOOR_OPEN_DURATION':
      return {
        ...state,
        durationSettings: {
          ...state.durationSettings,
          doorOpen: action.payload.doorOpen,
        }
      }
    case 'CHANGE_FACE_RECOGNITION_THRESHOLD':
      return {
        ...state,
        faceRecognitionThreshold: action.payload.faceRecognitionThreshold
      }
    default:
      return state
  }
}

export default MainSettingsReducer
