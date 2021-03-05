import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Flat from './Flat'
import * as actionsFlat from '../../../redux/actions/flat/Flat'
import * as actions from '../../../redux/actions/flat/main-settings/MainSettings'
import { requestLineSignal } from '../../../redux/actions/intercom/Intercom'

const mapStateToProps = (state) => {
  return {
    flatSettings: state.flat,
    firstFlatNumber: state.intercom.mainSettings.flatsSettings.firstNumber,
    lastFlatNumber: state.intercom.mainSettings.flatsSettings.lastNumber,
    flatSettingsWasReseted: state.flat.mainSettings.flatSettingsWasReseted,
    settingsWasGetted: state.flat.mainSettings.settingsWasGetted,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    toggleFlatSettingsWasReseted,
    changeNumber,
    changeUseCustomSettings,
    changeBlockCalls,
    changeFlatLineThresholdsMinNumber,
    changeFlatLineThresholdsMaxNumber,
    changeSipAccountsServer,
    changeSipAccountsLogin,
  } = bindActionCreators(actions, dispatch);

  const { 
    requestFlatSettings,
    requestUpdateFlatSettings, 
    requestResetFlatSettings,
    requestResetAllFlatsSettings,
  } = bindActionCreators(actionsFlat, dispatch);

  return {
    toggleFlatSettingsWasReseted,
    requestFlatSettings: (number) => requestFlatSettings(number),
    requestUpdateFlatSettings: (values, number) => requestUpdateFlatSettings(values, number),
    requestResetFlatSettings: (number) => requestResetFlatSettings(number),
    requestResetAllFlatsSettings: (number) => requestResetAllFlatsSettings(number),
    requestLineSignal: (number, type) => dispatch(requestLineSignal(number, type)),
    changeNumber: (number) => changeNumber(number),
    changeUseCustomSettings,
    changeBlockCalls,
    changeFlatLineThresholdsMinNumber: (min) => changeFlatLineThresholdsMinNumber(min),
    changeFlatLineThresholdsMaxNumber: (max) => changeFlatLineThresholdsMaxNumber(max),
    changeSipAccountsServer: (server) => changeSipAccountsServer(server),
    changeSipAccountsLogin: (login) => changeSipAccountsLogin(login),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Flat)
