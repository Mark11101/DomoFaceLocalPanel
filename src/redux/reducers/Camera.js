export const initialState = {
  mainStream: '',
  subStream: '',
  snapshot: '',
}

const CameraReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_CAMERA_RTSP_SUCCESS':
      return {
        ...state,
        mainStream: action.payload.response.mainStream,
        subStream: action.payload.response.subStream,
      }

    case 'REQUEST_CAMERA_SNAPSHOT_SUCCESS':
      return {
        ...state,
        snapshot: action.payload.response,
      }
    
    default:
      return state
  }
}

export default CameraReducer
