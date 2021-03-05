import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/audio-settings/intercom-audio-device/IntercomAudioDevice'
import IntercomAudioDevice from './IntercomAudioDevice'

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
    changeSpeakerFlatGain,
    changeSpeakerSipGain,
  } = bindActionCreators(actions, dispatch)

  return {
    changeMicrophoneGain: (gain) => changeMicrophoneGain(gain),
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain: (agcModeMaxGain) => changeMicrophoneAgcModeMaxGain(agcModeMaxGain),
    changeMicrophoneAgcModeTargetLevel: (agcModeTargetLevel) => changeMicrophoneAgcModeTargetLevel(agcModeTargetLevel),
    changeSpeakerSfxGain: (sfxGain) => changeSpeakerSfxGain(sfxGain),
    changeSpeakerFlatGain: (flatGain) => changeSpeakerFlatGain(flatGain),
    changeSpeakerSipGain: (sipGain) => changeSpeakerSipGain(sipGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntercomAudioDevice)
