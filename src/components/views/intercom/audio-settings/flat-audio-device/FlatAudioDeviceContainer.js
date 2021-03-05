import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/audio-settings/flat-audio-device/FlatAudioDevice'
import FlatAudioDevice from './FlatAudioDevice'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    changeMicrophoneGain,
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain,
    changeMicrophoneAgcModeTargetLevel,
    changeSpeakerSfxGain,
    changeSpeakerIntercomGain,
  } = bindActionCreators(actions, dispatch);

  return {
    changeMicrophoneGain: (gain) => changeMicrophoneGain(gain),
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain: (agcModeMaxGain) => changeMicrophoneAgcModeMaxGain(agcModeMaxGain),
    changeMicrophoneAgcModeTargetLevel: (agcModeTargetLevel) => changeMicrophoneAgcModeTargetLevel(agcModeTargetLevel),
    changeSpeakerSfxGain: (sfxGain) => changeSpeakerSfxGain(sfxGain),
    changeSpeakerIntercomGain: (intercomGain) => changeSpeakerIntercomGain(intercomGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatAudioDevice)
