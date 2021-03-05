import { connect } from 'react-redux'

import { 
  logOut ,
  requestIntercomHealthCheck,
} from '../../redux/actions/Auth'
import {
  requestFaces,
  requestAllImagesFace,
  requestSendFace,
  requestDeleteCurrentFace,
} from '../../redux/actions/Faces'
import { requestUpdateUser } from '../../redux/actions/Users'
import { requestOpenDoor } from '../../redux/actions/intercom/Intercom'
import { requestCameraRtsp } from '../../redux/actions/Camera'

import ResidentScreen from './ResidentScreen'

const mapStateToProps = (state) => {
  return {
    id: state.users.currentUser.id,
    role: state.users.currentUser.role,
    login: state.users.currentUser.login,
    flatNumber: state.users.currentUser.flatNumber,
    faces: state.faces.faces,
    images: state.faces.images,
    users: state.users.users,
    intercomHealth: state.auth.intercomHealth,
    isLogged: state.auth.isLogged,
    camera: state.camera,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    logOut: () => dispatch(logOut()),
    requestOpenDoor: () => dispatch(requestOpenDoor()),
    requestIntercomHealthCheck: () => dispatch(requestIntercomHealthCheck()),
    requestUpdateUser: (id, values) => dispatch(requestUpdateUser(id, values)),
    requestFaces: () => dispatch(requestFaces()),
    requestAllImagesFace: (faces) => dispatch(requestAllImagesFace(faces)),
    requestSendFace: (data) => dispatch(requestSendFace(data)),
    requestDeleteCurrentFace: (faceId) => dispatch(requestDeleteCurrentFace(faceId)),
    requestCameraRtsp: () => dispatch(requestCameraRtsp()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResidentScreen)
