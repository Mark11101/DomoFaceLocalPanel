import axios from 'axios'
import { map, catchError, switchMap} from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import { 
	requestIntercomHealthCheck,
	requestIntercomHealthCheckSuccess,
	requestIntercomHealthCheckError,
 } from '../actions/Auth'

 import { requestCurrentUser } from '../actions/Users'

 import config from '../../config/Config'

 const baseUrl = config.baseUrl;

export const requestIntercomHealthCheckEpic = (action$, state$) => action$.pipe(
	ofType('REQUEST_INTERCOM_HEALTH_CHECK'),
	switchMap(() => 
    from(
    	axios.get(baseUrl + '/api/v1/healthcheck',
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
					requestIntercomHealthCheckSuccess(result.data)
				:
					requestIntercomHealthCheckError(result.error)
			),
			catchError((error) => {
				console.error(error)
				return of(requestIntercomHealthCheckError(error))
			}),
    ),
	),
)

export const signInEpic = (action$) => action$.pipe(
  ofType('SIGN_IN'),
  switchMap(() => of(requestIntercomHealthCheck()))
)

export const requestIntercomHealthCheckSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_INTERCOM_HEALTH_CHECK_SUCCESS'),
  switchMap(() => of(requestCurrentUser()))
)

export default [
	signInEpic,
	requestIntercomHealthCheckEpic,
	requestIntercomHealthCheckSuccessEpic,
]
