import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/sip-settings/flats-credential/FlatsCredential'
import FlatsCredential from './FlatsCredential'

const mapStateToProps = (state) => {
  return {
    flatsCredential: state.intercom.sipSettings.flatsCredential,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestFlatsCredential,
    requestUpdateFlatsCredential,
    requestResetFlatsCredential,
    requestFlatsCredentialTurn,
    requestUpdateFlatsCredentialTurn,
    requestResetFlatsCredentialTurn,
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
    requestFlatsCredential,
    requestUpdateFlatsCredential: (values) => requestUpdateFlatsCredential(values),
    requestResetFlatsCredential,
    requestFlatsCredentialTurn,
    requestUpdateFlatsCredentialTurn: (values) => requestUpdateFlatsCredentialTurn(values),
    requestResetFlatsCredentialTurn,
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
)(FlatsCredential)
