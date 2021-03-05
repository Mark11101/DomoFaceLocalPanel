import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestKeys,
  requestKeysSuccess,
  requestKeysError,
  requestAddKeySuccess,
  requestAddKeyError,
  requestDeleteAllKeysSuccess,
  requestDeleteAllKeysError,
  requestDeleteKeySuccess,
  requestDeleteKeyError,
  requestPinCodes,
  requestPinCodesSuccess,
  requestPinCodesError,
  requestAddPinCodeSuccess,
  requestAddPinCodeError,
  requestDeleteAllPinCodesSuccess,
  requestDeleteAllPinCodesError,
  requestDeletePinCodeSuccess,
  requestDeletePinCodeError,
  requestQrCodes,
  requestQrCodesSuccess,
  requestQrCodesError,
  requestAddQrCodeSuccess,
  requestAddQrCodeError,
  requestDeleteAllQrCodesSuccess,
  requestDeleteAllQrCodesError,
  requestDeleteQrCodeSuccess,
  requestDeleteQrCodeError,
  requestDownloadKeysSuccess,
  requestDownloadKeysError,
  requestLoadKeysSuccess,
  requestLoadKeysError,
  requestDownloadPinCodesSuccess,
  requestDownloadPinCodesError,
  requestLoadPinCodesSuccess,
  requestLoadPinCodesError,
  requestDownloadQrCodesSuccess,
  requestDownloadQrCodesError,
  requestLoadQrCodesSuccess,
  requestLoadQrCodesError,
} from '../actions/Keys'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestKeysEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_KEYS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/keys',   
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
          requestKeysSuccess(result.data)
        :
          requestKeysError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestKeysError(error))
      }),
    ),
  ),
)

export const requestAddKeyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_KEY'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/keys',
      {
        flatNumber: action.payload.flatNumber,
        data: action.payload.key
      },  
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
          requestAddKeySuccess(result.data)
        :
          requestAddKeyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddKeyError(error))
      }),
    ),
  ),
)

export const requestAddKeySuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_KEY_SUCCESS'),
  switchMap(() => of(requestKeys()))
)

export const requestDeleteAllKeysEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_KEYS'),
  switchMap((action) => 
    from(
      axios.delete(
        action.payload.flatNumber === 0 
        ? 
          baseUrl + '/api/v1/keys/all' 
        : 
          baseUrl + '/api/v1/keys/all?flatNumber=' + action.payload.flatNumber,  
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
          requestDeleteAllKeysSuccess(result.data)
        :
          requestDeleteAllKeysError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllKeysError(error))
      }),
    ),
  ),
)

export const requestDeleteAllKeysSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_KEYS_SUCCESS'),
  switchMap(() => of(requestKeys()))
)

export const requestDeleteKeyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_KEY'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/keys/' + action.payload.id,
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      },   
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteKeySuccess(result.data)
        :
          requestDeleteKeyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteKeyError(error))
      }),
    ),
  ),
)

export const requestDeleteKeySuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_KEY_SUCCESS'),
  switchMap(() => of(requestKeys()))
)

export const requestPinCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_PIN_CODES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/pinCodes',   
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
          requestPinCodesSuccess(result.data)
        :
          requestPinCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestPinCodesError(error))
      }),
    ),
  ),
)

export const requestAddPinCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_PIN_CODE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/pinCodes', 
      {
        flatNumber: action.payload.flatNumber,
        code: action.payload.code
      },  
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
          requestAddPinCodeSuccess(result.data)
        :
          requestAddPinCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddPinCodeError(error))
      }),
    ),
  ),
)

export const requestAddPinCodeSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_PIN_CODE_SUCCESS'),
  switchMap(() => of(requestPinCodes()))
)

export const requestDeleteAllPinCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_PIN_CODES'),
  switchMap((action) => 
    from(
      axios.delete(
        action.payload.flatNumber === 0 
        ? 
          baseUrl + '/api/v1/pinCodes/all' 
        : 
          baseUrl + '/api/v1/pinCodes/all?flatNumber=' + action.payload.flatNumber,   
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
          requestDeleteAllPinCodesSuccess(result.data)
        :
          requestDeleteAllPinCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllPinCodesError(error))
      }),
    ),
  ),
)

export const requestDeleteAllPinCodesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_PIN_CODES_SUCCESS'),
  switchMap(() => of(requestPinCodes()))
)

export const requestDeletePinCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_PIN_CODE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/pinCodes/' + action.payload.id,
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }, 
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeletePinCodeSuccess(result.data)
        :
          requestDeletePinCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeletePinCodeError(error))
      }),
    ),
  ),
)

export const requestDeletePinCodeSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_PIN_CODE_SUCCESS'),
  switchMap(() => of(requestPinCodes()))
)

export const requestQrCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_QR_CODES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/qrCodes',   
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
          requestQrCodesSuccess(result.data)
        :
          requestQrCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestQrCodesError(error))
      }),
    ),
  ),
)

export const requestAddQrCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_QR_CODE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/qrCodes', 
      {
        flatNumber: action.payload.flatNumber,
        code: action.payload.code
      },    
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
          requestAddQrCodeSuccess(result.data)
        :
          requestAddQrCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddQrCodeError(error))
      }),
    ),
  ),
)

export const requestAddQrCodeSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_QR_CODE_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export const requestDeleteAllQrCodesEpic = (action$, state$) => { console.log(action$.values) 
  return action$.pipe(
  ofType('REQUEST_DELETE_ALL_QR_CODES'),
  switchMap((action) => 
    from(
      axios.delete(
        action.payload.flatNumber === 0 
        ? 
          baseUrl + '/api/v1/qrCodes/all' 
        : 
          baseUrl + '/api/v1/qrCodes/all?flatNumber=' + action.payload.flatNumber,  
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
          requestDeleteAllQrCodesSuccess(result.data)
        :
          requestDeleteAllQrCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllQrCodesError(error))
      }),
    ),
  ),
)
    }
export const requestDeleteAllQrCodesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_QR_CODES_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export const requestDeleteQrCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_QR_CODE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/qrCodes/' + action.payload.id,
      {
        auth: {
          username: state$.value.auth.login,
          password: state$.value.auth.password,
        }
      }, 
    )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteQrCodeSuccess(result.data)
        :
          requestDeleteQrCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteQrCodeError(error))
      }),
    ),
  ),
)

export const requestDeleteQrCodeSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_QR_CODE_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export const requestDownloadKeysEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_KEYS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/keys/dump',   
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

          return requestDownloadKeysSuccess(result.data)
        } else {
          requestDownloadKeysError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadKeysError(error))
      }),
    ),
  ),
)

export const requestLoadKeysEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_KEYS'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/keys/restore', action.payload.file,   
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
          requestLoadKeysSuccess(result.id, result.description)
        :
          requestLoadKeysError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestLoadKeysError(error))
      })
    )
  ),
);

export const requestLoadKeysSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_KEYS_SUCCESS'),
  switchMap(() => of(requestKeys()))
)

export const requestDownloadPinCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_PIN_CODES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/pinCodes/dump',   
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

          return requestDownloadPinCodesSuccess(result.data)
        } else {
          requestDownloadPinCodesError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadPinCodesError(error))
      }),
    ),
  ),
)

export const requestLoadPinCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_PIN_CODES'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/pinCodes/restore', action.payload.file,   
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
          requestLoadPinCodesSuccess(result.id, result.description)
        :
          requestLoadPinCodesError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestLoadPinCodesError(error))
      })
    )
  ),
);

export const requestLoadPinCodesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_PIN_CODES_SUCCESS'),
  switchMap(() => of(requestPinCodes()))
)

export const requestDownloadQrCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_QR_CODES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/qrCodes/dump',   
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

          return requestDownloadQrCodesSuccess(result.data)
        } else {
          requestDownloadQrCodesError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadQrCodesError(error))
      }),
    ),
  ),
)

export const requestLoadQrCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_QR_CODES'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/qrCodes/restore', action.payload.file,   
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
          requestLoadQrCodesSuccess(result.id, result.description)
        :
          requestLoadQrCodesError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestLoadQrCodesError(error))
      })
    )
  ),
);

export const requestLoadQrCodesSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_QR_CODES_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export default [
  requestKeysEpic,
  requestAddKeyEpic,
  requestAddKeySuccessEpic,
  requestDeleteAllKeysEpic,
  requestDeleteAllKeysSuccessEpic,
  requestDeleteKeyEpic,
  requestDeleteKeySuccessEpic,
  requestPinCodesEpic,
  requestAddPinCodeEpic,
  requestAddPinCodeSuccessEpic,
  requestDeleteAllPinCodesEpic,
  requestDeleteAllPinCodesSuccessEpic,
  requestDeletePinCodeEpic,
  requestDeletePinCodeSuccessEpic,
  requestQrCodesEpic,
  requestAddQrCodeEpic,
  requestAddQrCodeSuccessEpic,
  requestDeleteAllQrCodesEpic,
  requestDeleteAllQrCodesSuccessEpic,
  requestDeleteQrCodeEpic,
  requestDeleteQrCodeSuccessEpic,
  requestDownloadKeysEpic,
  requestLoadKeysEpic,
  requestLoadKeysSuccessEpic,
  requestDownloadPinCodesEpic,
  requestLoadPinCodesEpic,
  requestLoadPinCodesSuccessEpic,
  requestDownloadQrCodesEpic,
  requestLoadQrCodesEpic,
  requestLoadQrCodesSuccessEpic,
]
