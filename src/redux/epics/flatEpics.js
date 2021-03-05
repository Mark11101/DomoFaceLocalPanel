import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestFlatSettings,
  requestFlatSettingsSuccess,
  requestFlatSettingsError,
  requestUpdateFlatSettingsSuccess,
  requestUpdateFlatSettingsError,
  requestResetFlatSettingsSuccess,
  requestResetFlatSettingsError,
  requestResetAllFlatsSettingsSuccess,
  requestResetAllFlatsSettingsError,
} from '../actions/flat/Flat'

import {
  requestFlatSipAccounts,
  requestFlatSipAccountsSuccess,
  requestFlatSipAccountsError,
  requestAddFlatSipAccountSuccess,
  requestAddFlatSipAccountError,
  requestDeleteAllFlatSipAccountsSuccess,
  requestDeleteAllFlatSipAccountsError,
  requestDeleteFlatSipAccountSuccess,
  requestDeleteFlatSipAccountError,
} from '../actions/flat/flat-sip-accounts/FlatSipAccounts'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestFlatSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FLAT_SETTINGS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/settings/flats/' + action.payload.number,   
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
          requestFlatSettingsSuccess(result.data)
        :
          requestFlatSettingsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFlatSettingsError(error))
      }),
    ),
  ),
)

export const requestUpdateFlatSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FLAT_SETTINGS'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/settings/flats/' + action.payload.number, action.payload.values,   
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
          requestUpdateFlatSettingsSuccess(result.data)
        :
          requestUpdateFlatSettingsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFlatSettingsError(error))
      })
    )
  )
)

export const requestResetFlatSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_FLAT_SETTINGS'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/settings/flats/' + action.payload.number,   
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
          requestResetFlatSettingsSuccess(result.data)
        :
          requestResetFlatSettingsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetFlatSettingsError(error))
      }),
    ),
  ),
)

export const requestResetAllFlatsSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_ALL_FLATS_SETTINGS'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/settings/flats/all',   
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
          requestResetAllFlatsSettingsSuccess(action.payload.choosenFlatNumber)
        :
          requestResetAllFlatsSettingsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetAllFlatsSettingsError(error))
      }),
    ),
  ),
)

export const requestResetAllFlatsSettingsSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_ALL_FLATS_SETTINGS_SUCCESS'),
  switchMap(
    (action) => 
      !!action.payload.choosenFlatNumber
      ?
        [
          requestFlatSettings(action.payload.choosenFlatNumber),
          requestFlatSipAccounts(action.payload.choosenFlatNumber)
        ]
      :
        of()
  ),
)

export const requestFlatSipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FLAT_SIP_ACCOUNTS'),
  switchMap((action) =>
    from(
      axios.get(baseUrl + '/api/v1/sip/flats/accounts?flatNumber=' + action.payload.number,
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
          requestFlatSipAccountsSuccess(result.data)
        :
          requestFlatSipAccountsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFlatSipAccountsError(error))
      })
    )
  )
)

export const requestAddFlatSipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_FLAT_SIP_ACCOUNT'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/sip/flats/accounts',
      {
        flatNumber: action.payload.number,
        server: action.payload.server,
        login: action.payload.login,
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
          requestAddFlatSipAccountSuccess(result.data)
        :
          requestAddFlatSipAccountError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddFlatSipAccountError(error))
      })
    )
  )
)

export const requestDeleteAllFlatSipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/flats/accounts/all',   
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
          requestDeleteAllFlatSipAccountsSuccess(action.payload.number)
        :
          requestDeleteAllFlatSipAccountsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllFlatSipAccountsError(error))
      })
    )
  )
)

export const requestDeleteAllFlatSipAccountsSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_FLAT_SIP_ACCOUNTS_SUCCESS'),
  switchMap((action) => of(requestFlatSipAccounts(action.payload.number)))
)

export const requestDeleteFlatSipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FLAT_SIP_ACCOUNT'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/flats/accounts/' + action.payload.id,
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
          requestDeleteFlatSipAccountSuccess(action.payload.number)
        :
          requestDeleteFlatSipAccountError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteFlatSipAccountError(error))
      })
    )
  )
)

export const requestDeleteFlatSipAccountSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FLAT_SIP_ACCOUNT_SUCCESS'),
  switchMap((action) => of(requestFlatSipAccounts(action.payload.number)))
)

export default [
  requestFlatSettingsEpic,
  requestUpdateFlatSettingsEpic,
  requestResetFlatSettingsEpic,
  requestResetAllFlatsSettingsEpic,
  requestResetAllFlatsSettingsSuccessEpic,
  requestFlatSipAccountsEpic,
  requestAddFlatSipAccountEpic,
  requestDeleteAllFlatSipAccountsEpic,
  requestDeleteAllFlatSipAccountsSuccessEpic,
  requestDeleteFlatSipAccountEpic,
  requestDeleteFlatSipAccountSuccessEpic,
]
