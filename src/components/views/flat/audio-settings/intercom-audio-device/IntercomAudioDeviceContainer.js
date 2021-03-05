import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/flat/audio-settings/intercom-audio-device/IntercomAudioDevice'
import IntercomAudioDevice from './IntercomAudioDevice'

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
    changeFlatGain,
    changeSipGain,
  } = bindActionCreators(actions, dispatch);

  return {
    changeGain: (gain) => changeGain(gain),
    changeAgcMode,
    changeAgcModeMaxGain: (agcModeMaxGain) => changeAgcModeMaxGain(agcModeMaxGain),
    changeAgcModeTargetLevel: (agcModeTargetLevel) => changeAgcModeTargetLevel(agcModeTargetLevel),
    changeFlatGain: (flatGain) => changeFlatGain(flatGain),
    changeSipGain: (sipGain) => changeSipGain(sipGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntercomAudioDevice)
