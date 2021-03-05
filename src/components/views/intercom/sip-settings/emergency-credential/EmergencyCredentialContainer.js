import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/sip-settings/emergency-credential/EmergencyCredential'
import EmergencyCredential from './EmergencyCredential'

const mapStateToProps = (state) => {
  return {
    emergencyCredential: state.intercom.sipSettings.emergencyCredential,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestEmergencyCredential,
    requestUpdateEmergencyCredential,
    requestResetEmergencyCredential,
    requestEmergencyCredentialTurn,
    requestUpdateEmergencyCredentialTurn,
    requestResetEmergencyCredentialTurn,
    changeServer,
    changeLogin,
    changePassword,
    changeUseStun,
    changeUseStunMedia,
    changeUseIce,
    changeUseTurn,
    changeTurnServerServer,
    changeTurnServerConnectionType,
    changeTurnServerLogin,
    changeTurnServerPassword,
  } = bindActionCreators(actions, dispatch);

  return {
    requestEmergencyCredential,
    requestUpdateEmergencyCredential: (values) => requestUpdateEmergencyCredential(values),
    requestResetEmergencyCredential,
    requestEmergencyCredentialTurn,
    requestUpdateEmergencyCredentialTurn: (values) => requestUpdateEmergencyCredentialTurn(values),
    requestResetEmergencyCredentialTurn,
    changeServer: (server) => changeServer(server),
    changeLogin: (login) => changeLogin(login),
    changePassword: (password) => changePassword(password),
    changeUseStun,
    changeUseStunMedia,
    changeUseIce,
    changeUseTurn,
    changeTurnServerServer: (server) => changeTurnServerServer(server),
    changeTurnServerConnectionType: (connectionType) => changeTurnServerConnectionType(connectionType),
    changeTurnServerLogin: (login) => changeTurnServerLogin(login),
    changeTurnServerPassword: (password) => changeTurnServerPassword(password),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmergencyCredential)
