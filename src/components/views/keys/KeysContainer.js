import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/Keys'
import Keys from './Keys'

const mapStateToProps = (state) => {
  return {
    keys: state.keys.keys,
    pinCodes: state.keys.pinCodes,
    qrCodes: state.keys.qrCodes,
    firstFlatNumber: state.intercom.mainSettings.flatsSettings.firstNumber,
    lastFlatNumber: state.intercom.mainSettings.flatsSettings.lastNumber,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestKeys,
    requestAddKey,
    requestDeleteAllKeys,
    requestDeleteKey,
    requestPinCodes,
    requestAddPinCode,
    requestDeleteAllPinCodes,
    requestDeletePinCode,
    requestQrCodes,
    requestAddQrCode,
    requestDeleteAllQrCodes,
    requestDeleteQrCode,
    requestDownloadKeys,
    requestLoadKeys,
    requestDownloadPinCodes,
    requestLoadPinCodes,
    requestDownloadQrCodes,
    requestLoadQrCodes,
  } = bindActionCreators(actions, dispatch);

  return {
    requestKeys,
    requestAddKey: (flatNumber, key) => requestAddKey(flatNumber, key),
    requestDeleteAllKeys: (flatNumber) => requestDeleteAllKeys(flatNumber),
    requestDeleteKey: (id) => requestDeleteKey(id),
    requestPinCodes,
    requestAddPinCode: (flatNumber, pinCode) => requestAddPinCode(flatNumber, pinCode),
    requestDeleteAllPinCodes: (flatNumber) => requestDeleteAllPinCodes(flatNumber),
    requestDeletePinCode: (id) => requestDeletePinCode(id),
    requestQrCodes,
    requestAddQrCode: (flatNumber, qrCode) => requestAddQrCode(flatNumber, qrCode),
    requestDeleteAllQrCodes: (flatNumber) => requestDeleteAllQrCodes(flatNumber),
    requestDeleteQrCode: (id) => requestDeleteQrCode(id),
    requestDownloadKeys,
    requestLoadKeys: (file) => requestLoadKeys(file),
    requestDownloadPinCodes,
    requestLoadPinCodes: (file) => requestLoadPinCodes(file),
    requestDownloadQrCodes,
    requestLoadQrCodes: (file) => requestLoadQrCodes(file),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Keys)
