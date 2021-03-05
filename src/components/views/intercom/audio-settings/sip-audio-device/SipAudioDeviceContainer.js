import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/audio-settings/sip-audio-device/SipAudioDevice'
import SipAudioDevice from './SipAudioDevice'

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
    changeSpeakerFlatGain,
  } = bindActionCreators(actions, dispatch);

  return {
    changeMicrophoneGain: (gain) => changeMicrophoneGain(gain),
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain: (agcModeMaxGain) => changeMicrophoneAgcModeMaxGain(agcModeMaxGain),
    changeMicrophoneAgcModeTargetLevel: (agcModeTargetLevel) => changeMicrophoneAgcModeTargetLevel(agcModeTargetLevel),
    changeSpeakerSfxGain: (sfxGain) => changeSpeakerSfxGain(sfxGain),
    changeSpeakerIntercomGain: (sipGain) => changeSpeakerIntercomGain(sipGain),
    changeSpeakerFlatGain: (flatGain) => changeSpeakerFlatGain(flatGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SipAudioDevice)
