import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FlatAudioDevice from './FlatAudioDevice'
import * as actions from '../../../../../redux/actions/flat/audio-settings/flat-audio-device/FlatAudioDevice'

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
    changeSfxGain,
    changeIntercomGain,
  } = bindActionCreators(actions, dispatch);

  return {
    changeGain: (gain) => changeGain(gain),
    changeAgcMode,
    changeAgcModeMaxGain: (agcModeMaxGain) => changeAgcModeMaxGain(agcModeMaxGain),
    changeAgcModeTargetLevel: (agcModeTargetLevel) => changeAgcModeTargetLevel(agcModeTargetLevel),
    changeSfxGain: (sfxGain) => changeSfxGain(sfxGain),
    changeIntercomGain: (intercomGain) => changeIntercomGain(intercomGain),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatAudioDevice)
