export const requestFaces = () => {

  return {
    type: 'REQUEST_FACES'
  }
}

export const requestFacesSuccess = (response) => {

  return {
    type: 'REQUEST_FACES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestFacesError = (error) => {

  return {
    type: 'REQUEST_FACES_ERROR',
    error,
  }
}

export const requestSendFace = (data) => {

  return {
    type: 'REQUEST_SEND_FACE',
    payload: {
      data
    }
  }
}

export const requestSendFaceSuccess = (id, description) => {

  return {
    type: 'REQUEST_SEND_FACE_SUCCESS',
    payload: {
      id,
      description
    }
  }
}

export const requestSendFaceError = (error) => {

  return {
    type: 'REQUEST_SEND_FACE_ERROR',
    error
  }
}

export const requestDeleteAllFaces = (flatNumber) => {

  return {
    type: 'REQUEST_DELETE_ALL_FACES',
    payload: {
      flatNumber,
    }
  }
}

export const requestDeleteAllFacesSuccess = () => {

  return {
    type: 'REQUEST_DELETE_ALL_FACES_SUCCESS',
  }
}

export const requestDeleteAllFacesError = (error) => {

  return {
    type: 'REQUEST_DELETE_ALL_FACES_ERROR',
    error
  }
}

export const requestDeleteCurrentFace = (faceId) => {

  return {
    type: 'REQUEST_DELETE_CURRENT_FACE',
    payload: {
      faceId,
    }
  }
}

export const requestDeleteCurrentFaceSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_CURRENT_FACE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDeleteCurrentFaceError = (error) => {

  return {
    type: 'REQUEST_DELETE_CURRENT_FACE_ERROR',
    error
  }
}

export const requestUpdateFace = (faceId, data) => {

  return {
    type: 'REQUEST_UPDATE_FACE',
    payload: {
      faceId,
      data,
    }
  }
}

export const requestUpdateFaceSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FACE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFaceError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FACE_ERROR',
    error
  }
}

export const requestAllImagesFace = (faces) => {

  return {
    type: 'REQUEST_ALL_IMAGES_FACE',
    payload: {
      faces,
    }
  }
}

export const requestFaceImage = (faceId) => {

  return {
    type: 'REQUEST_FACE_IMAGE',
    payload: {
      faceId,
    }
  }
}

export const requestFaceImageSuccess = (data, id) => {

  return {
    type: 'REQUEST_FACE_IMAGE_SUCCESS',
    payload: {
      data,
      id
    }
  }
}

export const requestFaceImageError = (error) => {
  
  return {
    type: 'REQUEST_FACE_IMAGE_ERROR',
    error
  }
}

export const requestDownloadFaces = () => {

  return {
    type: 'REQUEST_DOWNLOAD_FACES'
  }
}

export const requestDownloadFacesSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_FACES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadFacesError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_FACES_ERROR',
    error,
  }
}

export const requestLoadFaces = (file) => {

  return {
    type: 'REQUEST_LOAD_FACES',
    payload: {
      file
    }
  }
}

export const requestLoadFacesSuccess = (response) => {

  return {
    type: 'REQUEST_LOAD_FACES_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestLoadFacesError = (error) => {

  return {
    type: 'REQUEST_LOAD_FACES_ERROR',
    error,
  }
}
