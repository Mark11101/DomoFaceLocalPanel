import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestCameraRtspSuccess,
  requestCameraRtspError,
  requestCameraSnapshotSuccess,
  requestCameraSnapshotError,
} from '../actions/Camera'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestCameraRtspEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CAMERA_RTSP'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/camera/rtsp',   
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
          requestCameraRtspSuccess(result.data)
        :
          requestCameraRtspError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCameraRtspError(error))
      }),
    ),
  ),
)

export const requestCameraSnapshotEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CAMERA_SNAPSHOT'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/camera/main/snapshot',   
      {
        responseType: 'arraybuffer',
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }
    )
    ).pipe(
      map((result) => {
        if (result.data) {
          let image = btoa(
            new Uint8Array(result.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          const base64Image = `data:${result.headers['content-type'].toLowerCase()};base64,${image}`;
          return requestCameraSnapshotSuccess(base64Image)
        } else {
          return requestCameraSnapshotError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestCameraSnapshotError(error))
      }),
    ),
  ),
)

export default [
  requestCameraRtspEpic,
  requestCameraSnapshotEpic,
]
