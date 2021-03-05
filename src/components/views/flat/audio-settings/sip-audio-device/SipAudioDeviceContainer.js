import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/flat/audio-settings/sip-audio-device/SipAudioDevice'
import SipAudioDevice from './SipAudioDevice'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    changeGain,
    changeAgcMode,
    changeAgcModeMaxGain,
    changeAgcModeTargetLevel,
    changeIntercomGain,
  } = bindActionCreators(actions, dispatch);

  return {
    changeGain: (gain) => changeGain(gain),
    changeAgcMode,
    changeAgcModeMaxGain: (agcModeMaxGain) => changeAgcModeMaxGain(agcModeMaxGain),
    changeAgcModeTargetLevel: (agcModeTargetLevel) => changeAgcModeTargetLevel(agcModeTargetLevel),
    changeIntercomGain: (intercomGain) => changeIntercomGain(intercomGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SipAudioDevice)
