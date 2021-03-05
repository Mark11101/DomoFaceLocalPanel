import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Faces from './Faces'
import * as actions from '../../../redux/actions/Faces'

const mapStateToProps = (state) => {
  return {
    faces: state.faces.faces,
    images: state.faces.images,
    firstFlatNumber: state.intercom.mainSettings.flatsSettings.firstNumber,
    lastFlatNumber: state.intercom.mainSettings.flatsSettings.lastNumber,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestFaces,
    requestSendFace,
    requestDeleteAllFaces,
    requestDeleteCurrentFace,
    requestUpdateFace,
    requestFaceImage,
    requestAllImagesFace,
    requestDownloadFaces,
    requestLoadFaces,
  } = bindActionCreators(actions, dispatch);
  
  return {
    requestFaces,
    requestSendFace: (data) => requestSendFace(data),
    requestDeleteAllFaces: (flatNumber) => requestDeleteAllFaces(flatNumber),
    requestDeleteCurrentFace: (faceId) => requestDeleteCurrentFace(faceId),
    requestUpdateFace: (faceId, data) => requestUpdateFace(faceId, data),
    requestFaceImage: (faceId) => requestFaceImage(faceId),
    requestAllImagesFace: (faces) => requestAllImagesFace(faces),
    requestDownloadFaces,
    requestLoadFaces: (file) => requestLoadFaces(file),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Faces)
