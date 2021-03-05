import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../redux/actions/intercom/Intercom'

import SysSettings from './SysSettings'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
	const {
		changeSyslogServerEnabled,
		changeSysServer,
		changeSysConnectionType,
	} = bindActionCreators(actions, dispatch)

	return {
		changeSyslogServerEnabled,
		changeSysServer: (server) => changeSysServer(server),
		changeSysConnectionType: (type) => changeSysConnectionType(type),
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SysSettings)
