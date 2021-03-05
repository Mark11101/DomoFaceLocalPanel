import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestUsers,
  requestUsersSuccess,
  requestUsersError,
  requestCurrentUser,
  requestCurrentUserSuccess,
  requestCurrentUserError,
  requestUpdateUserSuccess,
  requestUpdateUserError,
  requestCreateUserSuccess,
  requestCreateUserError,
  requestDeleteAllUsersSuccess,
  requestDeleteAllUsersError,
  requestDeleteUserSuccess,
  requestDeleteUserError,
} from '../actions/Users'

import { logOut } from '../actions/Auth'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestUsersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_USERS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/users',   
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
          requestUsersSuccess(result.data)
        :
          requestUsersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUsersError(error))
      }),
    ),
  ),
)

export const requestCurrentUserEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CURRENT_USER'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/users/me',    
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
          requestCurrentUserSuccess(result.data)
        :
          requestCurrentUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCurrentUserError(error))
      }),
    ),
  ),
)

export const requestUpdateUserEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_USER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/users/' + action.payload.id, action.payload.values,   
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
          requestUpdateUserSuccess(result.data, action.payload.values.login)
        :
          requestUpdateUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateUserError(error))
      }),
    ),
  ),
)

export const requestUpdateUserSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_USER_SUCCESS'),
  switchMap((action) => {
    return (
      action.payload.login === state$.value.users.currentUser.login
      ?
        of(logOut())
      :
        of(requestUsers())
    )
  })
)

export const requestUsersSecondEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_USERS'),
  switchMap(() => of(requestCurrentUser()))
)

export const requestCreateUserEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_USER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/users', action.payload.values,   
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
          requestCreateUserSuccess(result.data)
        :
          requestCreateUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateUserError(error))
      }),
    ),
  ),
)

export const requestCreateUserSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_USER_SUCCESS'),
  switchMap(() => of(requestUsers()))
)

export const requestDeleteAllUsersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_USERS'),
  switchMap(() => 
    from(
      axios.delete(baseUrl + '/api/v1/users/all',   
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
          requestDeleteAllUsersSuccess(result.data)
        :
          requestDeleteAllUsersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllUsersError(error))
      }),
    ),
  ),
)

export const requestDeleteAllUsersSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_USERS_SUCCESS'),
  switchMap(() => of(requestUsers()))
)

export const requestDeleteUserEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_USER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/users/' + action.payload.id,   
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
          requestDeleteUserSuccess(result.data)
        :
          requestDeleteUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteUserError(error))
      }),
    ),
  ),
)

export const requestDeleteUserSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_USER_SUCCESS'),
  switchMap(() => of(requestUsers()))
)

export default [
  requestUsersEpic,
  requestUsersSecondEpic,
  requestCurrentUserEpic,
  requestUpdateUserEpic,
  requestUpdateUserSuccessEpic,
  requestCreateUserEpic,
  requestCreateUserSuccessEpic,
  requestDeleteAllUsersEpic,
  requestDeleteAllUsersSuccessEpic,
  requestDeleteUserEpic,
  requestDeleteUserSuccessEpic,
]
