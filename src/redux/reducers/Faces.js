import { showErrorMessage } from '../../utils/notifications/messages'

export const initialState = {
  faces: [],
  images: [],
  isFaceLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FACES':
      return {
        ...state,
        isFaceLoading: true,
      }

    case 'REQUEST_FACES_SUCCESS':
      return {
        ...state,
        faces: action.payload.response,
        isFaceLoading: false,
      }

    case 'REQUEST_FACES_ERROR':
      return {
        ...state,
        isFaceLoading: false,
      }

    case 'REQUEST_SEND_FACE':
      return {
        ...state,
        isFaceLoading: true,
      }

    case 'REQUEST_LOAD_FACES':
      return {
        ...state,
        isFaceLoading: true,
      }

    case 'REQUEST_LOAD_FACES_ERROR':
      showErrorMessage('Не удалось загрузить лица, попробуйте еще раз')
      return {
        ...state,
        isFaceLoading: false,
      }

    case 'REQUEST_DELETE_CURRENT_FACE':
      return {
        ...state,
        isFaceLoading: true,
      }

    case 'REQUEST_DELETE_CURRENT_FACE_ERROR':
      showErrorMessage('Не удалось удалить лицо, попробуйте еще раз')
      return {
        ...state,
        isFaceLoading: false,
      }

    case 'REQUEST_DELETE_ALL_FACES':
      return {
        ...state,
        isFaceLoading: true,
      }

    case 'REQUEST_DELETE_ALL_FACES_ERROR':
      showErrorMessage('Не удалось удалить лица, попробуйте еще раз')
      return {
        ...state,
        isFaceLoading: false,
      }

    case 'REQUEST_DOWNLOAD_FACES':
      return {
        ...state,
        isFaceLoading: true,
      }  
      
    case 'REQUEST_DOWNLOAD_FACES_SUCCESS':
      return {
        ...state,
        isFaceLoading: false,
      }  
    
    case 'REQUEST_DOWNLOAD_FACES_ERROR':
      return {
        ...state,
        isFaceLoading: false,
      }
      
    case 'REQUEST_SEND_FACE_ERROR':
      if (action.error.response && action.error.response.status === 406) {
        showErrorMessage('Неподходящая фотография лица. Попробуйте еще раз или выберете другое изображение')
        return {
          ...state,
          isFaceLoading: false,
        }
      } else {
        showErrorMessage('Не удалось добавить лицо, попробуйте еще раз')
        return {
          ...state,
          isFaceLoading: false,
        }
      }

    case 'REQUEST_UPDATE_FACE_ERROR':
      showErrorMessage('Не удалось обновить комментарий, попробуйте еще раз')
      return state

    case 'REQUEST_ALL_IMAGES_FACE':
      return {
        ...state,
        isFaceLoading: true,
      }
      
    case 'REQUEST_FACE_IMAGE_SUCCESS':
      return {
        ...state,
        images: [...state.images, {id:action.payload.id, data:action.payload.data}],
        isFaceLoading: false,
      }
      
      case 'REQUEST_FACE_IMAGE_ERROR':
        return {
          ...state,
          isFaceLoading: false,
        }

    case 'REQUEST_ALL_IMAGES_FACE_ERROR':
      return {
        ...state,
        isFaceLoading: false,
      }
      
    default:
      return state
  }
}

export default FacesReducer;
