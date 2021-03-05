import CodecTypes from '../../../../constants/CodecTypes'
import MainCamResolutionTypes from '../../../../constants/MainCamResolutionTypes'
import SubCamResolutionTypes from '../../../../constants/SubCamResolutionTypes'
import BitrateTypes from '../../../../constants/BitrateTypes'
import ProfileTypes from '../../../../constants/ProfileTypes'
import FrequencyTypes from '../../../../constants/FrequencyTypes'

export const initialState = {
  stream: {
    main: {
      codec: CodecTypes.H265PLUS,
      resolution: MainCamResolutionTypes['2304x1296'],
      framerate: '',
      bitrateType: BitrateTypes.CBR,
      bitrate: '',
      gopInterval: '',
      qpAuto: true,
      qpMin: '',
      qpMax: '',
    },
    sub: {
      codec: CodecTypes.H265PLUS,
      resolution: SubCamResolutionTypes['704x480'],
      framerate: '',
      bitrateType: BitrateTypes.CBR,
      bitrate: '',
      gopInterval: '',
      qpAuto: true,
      qpMin: '',
      qpMax: '',
    },
    profile: ProfileTypes.HIGH
  },
  image: {
    flipHorizontal: true,
    flipVertical: true,
    frequency: FrequencyTypes.FIFTYHZ,
    brightness: '',
    contrast: '',
    saturation: '',
    sharpness: '',
    wbAuto: true,
    wbManualRed: '',
    wbManualGreen: '',
    wbManualBlue: '',
    blc: '',
    hlc: '',
    dnr2d: '',
    dnr3d: '',
    antiFlicker: true,
    defogging: '',
    wdr: '',
    irAuto: true,
    irColored: true
  },
  password: '',
}

const CameraSettingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
      return {
        ...state,
        stream: action.payload.response.cameraSettings.stream,
        image: action.payload.response.cameraSettings.image,
        password: action.payload.response.cameraSettings.password,
      }

    case 'REQUEST_RESET_SETTINGS_SUCCESS':
      return {
        ...state,
        stream: action.payload.response.cameraSettings.stream,
        image: action.payload.response.cameraSettings.image,
        password: action.payload.response.cameraSettings.password,
      }

    case 'CHANGE_MAIN_CODEC':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            codec: action.payload.codec
          }
        }
      }

    case 'CHANGE_MAIN_RESOLUTION':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            resolution: action.payload.resolution
          }
        }
      }

    case 'CHANGE_MAIN_FRAMERATE':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            framerate: action.payload.framerate
          }
        }
      }

    case 'CHANGE_MAIN_BITRATE_TYPE':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            bitrateType: action.payload.bitrateType
          }
        }
      }

    case 'CHANGE_MAIN_BITRATE':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            bitrate: action.payload.bitrate
          }
        }
      }

    case 'CHANGE_MAIN_GOP_INTERVAL':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            gopInterval: action.payload.gopInterval
          }
        }
      }

    case 'CHANGE_MAIN_QP_AUTO':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            qpAuto: !state.stream.main.qpAuto,
          }
        }
      }

    case 'CHANGE_MAIN_QP_MIN':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            qpMin: action.payload.qpMin
          }
        }
      }

    case 'CHANGE_MAIN_QP_MAX':
      return {
        ...state,
        stream: {
          ...state.stream,
          main: {
            ...state.stream.main,
            qpMax: action.payload.qpMax
          }
        }
      }

    case 'CHANGE_SUB_CODEC':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            codec: action.payload.codec
          }
        }
      }

    case 'CHANGE_SUB_RESOLUTION':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            resolution: action.payload.resolution
          }
        }
      }

    case 'CHANGE_SUB_FRAMERATE':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            framerate: action.payload.framerate
          }
        }
      }

    case 'CHANGE_SUB_BITRATE_TYPE':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            bitrateType: action.payload.bitrateType
          }
        }
      }

    case 'CHANGE_SUB_BITRATE':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            bitrate: action.payload.bitrate
          }
        }
      }

    case 'CHANGE_SUB_GOP_INTERVAL':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            gopInterval: action.payload.gopInterval
          }
        }
      }

    case 'CHANGE_SUB_QP_AUTO':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            qpAuto: !state.stream.sub.qpAuto,
          }
        }
      }

    case 'CHANGE_SUB_QP_MIN':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            qpMin: action.payload.qpMin
          }
        }
      }

    case 'CHANGE_SUB_QP_MAX':
      return {
        ...state,
        stream: {
          ...state.stream,
          sub: {
            ...state.stream.sub,
            qpMax: action.payload.qpMax
          }
        }
      }

    case 'CHANGE_PROFILE':
      return {
        ...state,
        stream: {
          ...state.stream,
          profile: action.payload.profile,
        }
      }

    case 'CHANGE_FLIP_HORIZONTAL':
      return {
        ...state,
        image: {
          ...state.image,
          flipHorizontal: !state.image.flipHorizontal,
        }
      }

    case 'CHANGE_FLIP_VERTICAL':
      return {
        ...state,
        image: {
          ...state.image,
          flipVertical: !state.image.flipVertical,
        }
      }

    case 'CHANGE_FREQUENCY':
      return {
        ...state,
        image: {
          ...state.image,
          frequency: action.payload.frequency,
        }
      }

    case 'CHANGE_BRIGHTNESS':
      return {
        ...state,
        image: {
          ...state.image,
          brightness: action.payload.brightness,
        }
      }

    case 'CHANGE_CONTRAST':
      return {
        ...state,
        image: {
          ...state.image,
          contrast: action.payload.contrast,
        }
      }

    case 'CHANGE_SATURATION':
      return {
        ...state,
        image: {
          ...state.image,
          saturation: action.payload.saturation,
        }
      }

    case 'CHANGE_SHARPNESS':
      return {
        ...state,
        image: {
          ...state.image,
          sharpness: action.payload.sharpness,
        }
      }

    case 'CHANGE_WB_AUTO':
      return {
        ...state,
        image: {
          ...state.image,
          wbAuto: !state.image.wbAuto,
        }
      }

    case 'CHANGE_WB_MANUAL_RED':
      return {
        ...state,
        image: {
          ...state.image,
          wbManualRed: action.payload.wbManualRed,
        }
      }

    case 'CHANGE_WB_MANUAL_GREEN':
      return {
        ...state,
        image: {
          ...state.image,
          wbManualGreen: action.payload.wbManualGreen,
        }
      }

    case 'CHANGE_WB_MANUAL_BLUE':
      return {
        ...state,
        image: {
          ...state.image,
          wbManualBlue: action.payload.wbManualBlue,
        }
      }

    case 'CHANGE_BLC':
      return {
        ...state,
        image: {
          ...state.image,
          blc: action.payload.blc,
        }
      }

    case 'CHANGE_HLC':
      return {
        ...state,
        image: {
          ...state.image,
          hlc: action.payload.hlc,
        }
      }

    case 'CHANGE_DNR_2D':
      return {
        ...state,
        image: {
          ...state.image,
          dnr2d: action.payload.dnr2d,
        }
      }

    case 'CHANGE_DNR_3D':
      return {
        ...state,
        image: {
          ...state.image,
          dnr3d: action.payload.dnr3d,
        }
      }

    case 'CHANGE_DEFOGGING':
      return {
        ...state,
        image: {
          ...state.image,
          defogging: action.payload.defogging,
        }
      }

    case 'CHANGE_WDR':
      return {
        ...state,
        image: {
          ...state.image,
          wdr: action.payload.wdr,
        }
      }

    case 'CHANGE_ANTIFLICKER':
      return {
        ...state,
        image: {
          ...state.image,
          antiFlicker: !state.image.antiFlicker,
        }
      }

    case 'CHANGE_IR_AUTO':
      return {
        ...state,
        image: {
          ...state.image,
          irAuto: !state.image.irAuto,
        }
      }

    case 'CHANGE_IR_COLORED':
      return {
        ...state,
        image: {
          ...state.image,
          irColored: !state.image.irColored,
        }
      }

    case 'CHANGE_CAMERA_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      }

    default:
      return state
  }
}

export default CameraSettingsReducer
