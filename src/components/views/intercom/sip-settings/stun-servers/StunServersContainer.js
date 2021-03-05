import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../../redux/actions/intercom/sip-settings/stun-servers/StunServers'
import StunServers from './StunServers'

const mapStateToProps = (state) => {
  return {
    stunServers: state.intercom.sipSettings.stunServers,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestStunServers,
    requestAddStunServer,
    requestDeleteAllStunServers,
    requestDeleteStunServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestStunServers,
    requestAddStunServer: (server) => requestAddStunServer(server),
    requestDeleteAllStunServers,
    requestDeleteStunServer: (id) => requestDeleteStunServer(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StunServers)
