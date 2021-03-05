import { combineReducers } from 'redux'

import IntercomInfoReducer from './intercom/Intercom'
import MainSettingsReducer from './main-settings/MainSettings'
import SipSettingsReducer from './sip-settings/SipSettings'
import AudioSettingsReducer from './audio-settings/AudioSettings'
import CameraSettingsReducer from './camera-settings/CameraSettings'
import SysSettingsReducer from './sys-settings/SysSettings'

const IntercomReducer = combineReducers({
  intercomInfo:   IntercomInfoReducer,
  mainSettings:   MainSettingsReducer,
  sipSettings:    SipSettingsReducer,
  audioSettings:  AudioSettingsReducer,
  cameraSettings: CameraSettingsReducer,
  sysSettings:    SysSettingsReducer,
})

export default IntercomReducer
