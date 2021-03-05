import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/sip-settings/emergency-sip-accounts/EmergencySipAccounts'
import EmergencySipAccounts from './EmergencySipAccounts'

const mapStateToProps = (state) => {
  return {    
    emergencySipAccounts: state.intercom.sipSettings.emergencySipAccounts,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestEmergencySipAccounts,
    requestAddEmergencySipAccount,
    requestDeleteAllEmergencySipAccounts,
    requestDeleteEmergencySipAccount,
  } = bindActionCreators(actions, dispatch);

  return {
    requestEmergencySipAccounts,
    requestAddEmergencySipAccount: (server, login) => requestAddEmergencySipAccount(server, login),
    requestDeleteAllEmergencySipAccounts,
    requestDeleteEmergencySipAccount: (id) => requestDeleteEmergencySipAccount(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmergencySipAccounts)
