import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../redux/actions/intercom/main-settings/MainSettings'
import { requestLineSignal } from '../../../../redux/actions/intercom/Intercom'

import MainSettings from './MainSettings'

const mapStateToProps = (state) => {
  return {
    intercomSettings: state.intercom,
    intercomSettingsWasReseted: state.intercom.intercomInfo.intercomSettingsWasReseted,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    toggleIntercomSettingsWasReseted,
    changeCommutatorType,
    changeTimeZone,
    changeDatetime,
    changeNtpEnabled,
    changeNtpServer,
    changeCollectKey,
    changeFlatsFirstNumber,
    changeFlatsLastNumber,
    changeFaceRecognitionThreshold,
    changeMinLineThresholdsNumber,
    changeMaxLineThresholdsNumber,
    changeRingDuration,
    changeCallDuration,
    changeDoorOpenDuration,
  } = bindActionCreators(actions, dispatch);

  return {
    toggleIntercomSettingsWasReseted,
    changeCommutatorType: (commutatorType) => changeCommutatorType(commutatorType),
    changeTimeZone: (timeZone) => changeTimeZone(timeZone),
    changeDatetime: (date) => changeDatetime(date),
    changeNtpEnabled,
    changeNtpServer: (server) => changeNtpServer(server),
    changeCollectKey,
    changeFlatsFirstNumber: (firstNumber) => changeFlatsFirstNumber(firstNumber),
    changeFlatsLastNumber: (lastNumber) => changeFlatsLastNumber(lastNumber),
    changeFaceRecognitionThreshold: (faceRecognitionThreshold) => changeFaceRecognitionThreshold(faceRecognitionThreshold),
    changeMinLineThresholdsNumber: (min) => changeMinLineThresholdsNumber(min),
    changeMaxLineThresholdsNumber: (max) => changeMaxLineThresholdsNumber(max),
    changeRingDuration: (ring) => changeRingDuration(ring),
    changeCallDuration: (call) => changeCallDuration(call),
    changeDoorOpenDuration: (doorOpen) => changeDoorOpenDuration(doorOpen),
    requestLineSignal: (flatNumber) => dispatch(requestLineSignal(flatNumber)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainSettings)
