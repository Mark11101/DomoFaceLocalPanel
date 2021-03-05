import axios from 'axios'
import { map, catchError, switchMap, mergeMap} from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'
import config from '../../config/Config'

import {
  requestFaces,
  requestFacesSuccess,
  requestFacesError,
  requestSendFaceSuccess,
  requestSendFaceError,
  requestDeleteAllFacesSuccess,
  requestDeleteAllFacesError,
  requestDeleteCurrentFaceSuccess,
  requestDeleteCurrentFaceError,
  requestUpdateFaceSuccess,
  requestUpdateFaceError,
  requestFaceImageSuccess,
  requestFaceImageError,
  requestDownloadFacesSuccess,
  requestDownloadFacesError,
  requestLoadFacesSuccess,
  requestLoadFacesError,
} from '../actions/Faces'

const baseUrl = config.baseUrl;

export const requestFacesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FACES'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/faces',   
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) =>
        result.data
        ? 
          requestFacesSuccess(result.data)
        :
          requestFacesError(result.error)
      ),
      catchError((error) => {
        console.log(error)
        return of(requestFacesError(error))
      }),
    ),
  ),
)

export const requestSendFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SEND_FACE'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/faces', action.payload.data,   
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestSendFaceSuccess(result.id, result.description)
        :
          requestSendFaceError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestSendFaceError(error))
      })
    )
  ),
);

export const requestSendFaceSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SEND_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestDeleteAllFacesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_FACES'),
  switchMap((action) =>
    from(
      axios.delete(
      action.payload.flatNumber === null
      ? 
        baseUrl + '/api/v1/faces/all' 
      : 
        baseUrl + '/api/v1/faces/all?flatNumber=' + action.payload.flatNumber,      
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteAllFacesSuccess(result.data)
        :
          requestDeleteAllFacesError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestDeleteAllFacesError(error))
      })
    )
  ),
)

export const requestDeleteAllFacesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_FACES_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestDeleteCurrentFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_CURRENT_FACE'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + `/api/v1/faces/${action.payload.faceId}`,   
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteCurrentFaceSuccess(result.data)
        :
          requestDeleteCurrentFaceError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestDeleteCurrentFaceError(error))
      })
    )
  ),
)

export const requestDeleteCurrentSuccesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_CURRENT_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestUpdateFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FACE'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + `/api/v1/faces/${action.payload.faceId}`,
        action.payload.data,   
        {
          auth: {
            username: state$.value.auth.login,
            password: state$.value.auth.password,
          }
        }
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateFaceSuccess(result.data)
        :
          requestUpdateFaceError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestUpdateFaceError(error))
      })
    )
  ),
)

export const requestUpdateFaceSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestFaceImageEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FACE_IMAGE'),
  switchMap((action) =>
    from(
      axios.get(baseUrl + `/api/v1/faces/${action.payload.faceId}/image`,   
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) => 
        result.data
        ?
          requestFaceImageSuccess(action.payload.faceId, result.data)
        :
          requestFaceImageError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestFaceImageError(error))
      })
    )
  ),
)

export const requestAllImagesFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ALL_IMAGES_FACE'),
  switchMap((action) => 
    of(...action.payload.faces).pipe(
      mergeMap(face => 
        from(
          axios.get(baseUrl + `/api/v1/faces/${face.id}/image`, {
            responseType: 'arraybuffer',
            auth: {
              username: state$.value.auth.login,
              password: state$.value.auth.password,
            }
          })
        ).pipe(
          map((result) => {
            if (result.data) {
              let image = btoa(
                new Uint8Array(result.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              const base64Image = `data:${result.headers['content-type'].toLowerCase()};base64,${image}`;
              return requestFaceImageSuccess(base64Image, face.id)
            } else {
              return requestFaceImageError(result.error)
            }
          }),
          catchError((error) => {
            console.log(error);
            return of(requestFaceImageError(error))
          })
        )
      )
    )
    ),
)

export const requestDownloadFacesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_FACES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/faces/dump',   
      {
        responseType: 'blob',
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) => {

        if (result.data) {    
              
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', result.headers['content-disposition'].split(' ')[1].split('=')[1].slice(1, -1)); //or any other extension
          document.body.appendChild(link);
          link.click();

          return requestDownloadFacesSuccess(result.data)

        } else {
          requestDownloadFacesError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadFacesError(error))
      }),
    ),
  ),
)

export const requestLoadFacesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_FACES'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/faces/restore', action.payload.file,   
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestLoadFacesSuccess(result.id)
        :
          requestLoadFacesError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestLoadFacesError(error))
      })
    )
  ),
);

export const requestLoadFacesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_FACES_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export default [
  requestFacesEpic,
  requestSendFaceEpic,
  requestSendFaceSuccessEpic,
  requestDeleteAllFacesEpic,
  requestDeleteCurrentFaceEpic,
  requestUpdateFaceEpic,
  requestUpdateFaceSuccessEpic,
  requestDeleteCurrentSuccesEpic,
  requestDeleteAllFacesSuccessEpic,
  requestFaceImageEpic,
  requestAllImagesFaceEpic,
  requestDownloadFacesEpic,
  requestLoadFacesEpic,
  requestLoadFacesSuccessEpic,
]
