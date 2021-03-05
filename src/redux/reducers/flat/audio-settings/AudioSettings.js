import { combineReducers } from 'redux'

import IntercomAudioDevice from './intercom-audio-device/IntercomAudioDevice'
import FlatAudioDevice from './flat-audio-device/FlatAudioDevice'
import SipAudioDevice from './sip-audio-device/SipAudioDevice'

const SipSettingsReducer = combineReducers({
  intercomAudioDevice: IntercomAudioDevice,
  flatAudioDevice:     FlatAudioDevice,
  sipAudioDevice:      SipAudioDevice,  
})

export default SipSettingsReducer
