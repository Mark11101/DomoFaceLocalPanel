import { connect } from 'react-redux'

import UpdateHandler from './UpdateHandler'

const mapStateToProps = (state) => {
  return {
    isFaceLoading: state.faces.isFaceLoading,
    isKeysLoading: state.keys.isKeysLoading,
    isPinCodesLoading: state.keys.isPinCodesLoading,
    isQrCodesLoading: state.keys.isQrCodesLoading,
    isIntercomLoading: state.intercom.intercomInfo.isIntercomLoading,
    isFlatLoading: state.flat.mainSettings.isFlatLoading,
    isUsersLoading: state.users.isUsersLoading,
    isAuthLoading: state.auth.isAuthLoading,
    isLineSignalLoading: state.intercom.mainSettings.isLineSignalLoading,
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateHandler)
