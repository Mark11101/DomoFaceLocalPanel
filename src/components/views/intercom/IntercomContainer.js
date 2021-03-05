import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/intercom/Intercom'
import {
  requestCameraRtsp,
  requestCameraSnapshot,
} from '../../../redux/actions/Camera'

import Intercom from './Intercom'

const mapStateToProps = (state) => {
  return {
    intercomSettings: state.intercom,
    host: state.ui.host,
    camera: state.camera,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestIntercomInfo,
    requestIntercomSettings,
    requestOpenDoor,
    requestResetSetiings,
    requestUpdateIntercomSettings,
    requestRebootIntercom,
    requestDownloadSettings,
    requestLoadSettings,
    requestUpdateFirmware,
    requestDocumentation,
    changeSyslogServerEnabled,
    changeSysServer,
    changeSysConnectionType,
  } = bindActionCreators(actions, dispatch)

  return {
    requestIntercomInfo,
    requestCameraRtsp: () => dispatch(requestCameraRtsp()),
    requestCameraSnapshot: () => dispatch(requestCameraSnapshot()),
    requestIntercomSettings,
    requestOpenDoor,
    requestResetSetiings,
    requestRebootIntercom,
    requestDocumentation,
    requestUpdateIntercomSettings: (values) => requestUpdateIntercomSettings(values),
    requestDownloadSettings,
    requestLoadSettings: (file) => requestLoadSettings(file),
    requestUpdateFirmware: (file) => requestUpdateFirmware(file),
    changeSyslogServerEnabled,
    changeSysServer: (server) => changeSysServer(server),
    changeSysConnectionType: (type) => changeSysConnectionType(type),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intercom)
