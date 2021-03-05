import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestIntercomInfoSuccess,
  requestIntercomInfoError,
  requestIntercomSettingsSuccess,
  requestIntercomSettingsError,
  requestLineSignalSuccess,
  requestLineSignalError,
  requestOpenDoorSuccess,
  requestOpenDoorError,
  requestResetSetiingsSuccess,
  requestResetSetiingsError,
  requestUpdateIntercomSettingsSuccess,
  requestUpdateIntercomSettingsError,
  requestRebootIntercomSuccess,
  requestRebootIntercomError,
  requestDownloadSettingsSuccess,
  requestDownloadSettingsError,
  requestLoadSettingsSuccess,
  requestLoadSettingsError,
  requestUpdateFirmwareSuccess,
  requestUpdateFirmwareError,
} from '../actions/intercom/Intercom'

import {
  changeMaxLineThresholdsNumber,
  changeMinLineThresholdsNumber,
} from '../actions/intercom/main-settings/MainSettings'

import {
  requestFlatsCredentialSuccess,
  requestFlatsCredentialError,
  requestUpdateFlatsCredentialSuccess,
  requestUpdateFlatsCredentialError,
  requestResetFlatsCredentialSuccess,
  requestResetFlatsCredentialError,
  requestFlatsCredentialTurnSuccess,
  requestFlatsCredentialTurnError,
  requestUpdateFlatsCredentialTurnSuccess,
  requestUpdateFlatsCredentialTurnError,
  requestResetFlatsCredentialTurnSuccess,
  requestResetFlatsCredentialTurnError,
} from '../actions/intercom/sip-settings/flats-credential/FlatsCredential'

import {
  requestEmergencyCredentialSuccess,
  requestEmergencyCredentialError,
  requestUpdateEmergencyCredentialSuccess,
  requestUpdateEmergencyCredentialError,
  requestResetEmergencyCredentialSuccess,
  requestResetEmergencyCredentialError,
  requestEmergencyCredentialTurnSuccess,
  requestEmergencyCredentialTurnError,
  requestUpdateEmergencyCredentialTurnSuccess,
  requestUpdateEmergencyCredentialTurnError,
  requestResetEmergencyCredentialTurnSuccess,
  requestResetEmergencyCredentialTurnError,
} from '../actions/intercom/sip-settings/emergency-credential/EmergencyCredential'

import {
  requestStunServers,
  requestStunServersSuccess,
  requestStunServersError,
  requestAddStunServerSuccess,
  requestAddStunServerError,
  requestDeleteAllStunServersSuccess,
  requestDeleteAllStunServersError,
  requestDeleteStunServerSuccess,
  requestDeleteStunServerError,
} from '../actions/intercom/sip-settings/stun-servers/StunServers' 

import {
  requestEmergencySipAccounts,
  requestEmergencySipAccountsSuccess,
  requestEmergencySipAccountsError,
  requestAddEmergencySipAccountSuccess,
  requestAddEmergencySipAccountError,
  requestDeleteAllEmergencySipAccountsSuccess,
  requestDeleteAllEmergencySipAccountsError,
  requestDeleteEmergencySipAccountSuccess,
  requestDeleteEmergencySipAccountError,
} from '../actions/intercom/sip-settings/emergency-sip-accounts/EmergencySipAccounts' 

import {
  changeFlatLineThresholdsMinNumber,
  changeFlatLineThresholdsMaxNumber,
} from '../actions/flat/main-settings/MainSettings'

import { logOut } from '../actions/Auth'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestIntercomInfoEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_INTERCOM_INFO'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/info',   
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
          requestIntercomInfoSuccess(result.data)
        :
          requestIntercomInfoError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestIntercomInfoError(error))
      }),
    ),
  ),
)

export const requestIntercomSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_INTERCOM_SETTINGS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/settings',   
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
          requestIntercomSettingsSuccess(result.data)
        :
          requestIntercomSettingsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestIntercomSettingsError(error))
      }),
    ),
  ),
)

export const requestRebootIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_REBOOT_INTERCOM'),
  switchMap(() => 
    from(
      axios.post(baseUrl + '/api/v1/utils/reboot', {} ,
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
          requestRebootIntercomSuccess(result.data)
        :
          requestRebootIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestRebootIntercomError(error))
      }),
    ),
  ),
)

export const requestRebootIntercomSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_REBOOT_INTERCOM_SUCCESS'),
  switchMap(() => of(logOut()))
)

export const requestLineSignalEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LINE_SIGNAL'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/utils/lineSignal?flatNumber=' + action.payload.flatNumber,
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
          requestLineSignalSuccess(result.data, action.payload.type)
        :
          requestLineSignalError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestLineSignalError(error))
      }),
    ),
  ),
)

export const requestLineSignalSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LINE_SIGNAL_SUCCESS'),
  switchMap((action) => 
    action.payload.type === 'flat'
    ?
      action.payload.response.lineSignal > state$.value.flat.mainSettings.lineThresholds.min
      ?
        of(changeFlatLineThresholdsMaxNumber(action.payload.response.lineSignal))
      :
        of(changeFlatLineThresholdsMinNumber(action.payload.response.lineSignal))
    :
      action.payload.response.lineSignal > state$.value.intercom.mainSettings.flatsSettings.lineThresholds.min
      ?
        of(changeMaxLineThresholdsNumber(action.payload.response.lineSignal))
      :
        of(changeMinLineThresholdsNumber(action.payload.response.lineSignal))
  )
)

export const requestOpenDoorEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_OPEN_DOOR'),
  switchMap(() => 
    from(
      axios.post(baseUrl + '/api/v1/utils/openDoor', {} ,
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
          requestOpenDoorSuccess(result.data)
        :
          requestOpenDoorError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestOpenDoorError(error))
      }),
    ),
  ),
)

export const requestResetSetiingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_SETTINGS'),
  switchMap(() => 
    from(
      axios.delete(baseUrl + '/api/v1/settings',   
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
          requestResetSetiingsSuccess(result.data)
        :
          requestResetSetiingsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetSetiingsError(error))
      }),
    ),
  ),
)

export const requestUpdateIntercomSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_INTERCOM_SETTINGS'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/settings', action.payload.values,   
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
          requestUpdateIntercomSettingsSuccess(result.data)
        :
          requestUpdateIntercomSettingsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateIntercomSettingsError(error))
      })
    )
  )
)

export const requestFlatsCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FLATS_CREDENTIAL'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/flats/credential',   
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
          requestFlatsCredentialSuccess(result.data)
        :
          requestFlatsCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFlatsCredentialError(error))
      })
    )
  )
)

export const requestUpdateFlatsCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FLATS_CREDENTIAL'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/sip/flats/credential', action.payload.values,   
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
          requestUpdateFlatsCredentialSuccess(result.data)
        :
          requestUpdateFlatsCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFlatsCredentialError(error))
      })
    )
  )
)

export const requestResetFlatsCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_FLATS_CREDENTIAL'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/flats/credential',   
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
          requestResetFlatsCredentialSuccess(result.data)
        :
          requestResetFlatsCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetFlatsCredentialError(error))
      })
    )
  )
)

export const requestFlatsCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FLATS_CREDENTIAL_TURN'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/flats/credential/turn',   
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
          requestFlatsCredentialTurnSuccess(result.data)
        :
          requestFlatsCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFlatsCredentialTurnError(error))
      })
    )
  )
)

export const requestUpdateFlatsCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FLATS_CREDENTIAL_TURN'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/sip/flats/credential/turn', action.payload.values,   
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
          requestUpdateFlatsCredentialTurnSuccess(result.data)
        :
          requestUpdateFlatsCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFlatsCredentialTurnError(error))
      })
    )
  )
)

export const requestResetFlatsCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_FLATS_CREDENTIAL_TURN'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/flats/credential/turn',   
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
          requestResetFlatsCredentialTurnSuccess(result.data)
        :
          requestResetFlatsCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetFlatsCredentialTurnError(error))
      })
    )
  )
)

export const requestEmergencyCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_EMERGENCY_CREDENTIAL'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/emergency/credential',   
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
          requestEmergencyCredentialSuccess(result.data)
        :
          requestEmergencyCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestEmergencyCredentialError(error))
      })
    )
  )
)

export const requestUpdateEmergencyCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_EMERGENCY_CREDENTIAL'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/sip/emergency/credential', action.payload.values,   
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
          requestUpdateEmergencyCredentialSuccess(result.data)
        :
          requestUpdateEmergencyCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateEmergencyCredentialError(error))
      })
    )
  )
)

export const requestResetEmergencyCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_EMERGENCY_CREDENTIAL'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/emergency/credential',   
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
          requestResetEmergencyCredentialSuccess(result.data)
        :
          requestResetEmergencyCredentialError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetEmergencyCredentialError(error))
      })
    )
  )
)

export const requestEmergencyCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_EMERGENCY_CREDENTIAL_TURN'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/emergency/credential/turn',   
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
          requestEmergencyCredentialTurnSuccess(result.data)
        :
          requestEmergencyCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestEmergencyCredentialTurnError(error))
      })
    )
  )
)

export const requestUpdateEmergencyCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_EMERGENCY_CREDENTIAL_TURN'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/sip/emergency/credential/turn', action.payload.values,   
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
          requestUpdateEmergencyCredentialTurnSuccess(result.data)
        :
          requestUpdateEmergencyCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateEmergencyCredentialTurnError(error))
      })
    )
  )
)

export const requestResetEmergencyCredentialTurnEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESET_EMERGENCY_CREDENTIAL_TURN'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/emergency/credential/turn',   
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
          requestResetEmergencyCredentialTurnSuccess(result.data)
        :
          requestResetEmergencyCredentialTurnError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResetEmergencyCredentialTurnError(error))
      })
    )
  )
)

export const requestStunServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_STUN_SERVERS'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/stunServers',   
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
          requestStunServersSuccess(result.data)
        :
          requestStunServersError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestStunServersError(error))
      })
    )
  )
)

export const requestAddStunServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_STUN_SERVER'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/sip/stunServers',
      { 
        server: action.payload.newStunServer
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
          requestAddStunServerSuccess(result.data)
        :
          requestAddStunServerError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddStunServerError(error))
      })
    )
  )
)

export const requestDeleteAllStunServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_STUN_SERVERS'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/stunServers/all',   
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
          requestDeleteAllStunServersSuccess(result.data)
        :
          requestDeleteAllStunServersError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllStunServersError(error))
      })
    )
  )
)

export const requestDeleteAllStunServersSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_STUN_SERVERS_SUCCESS'),
  switchMap(() => of(requestStunServers()))
)

export const requestDeleteStunServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_STUN_SERVER'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/stunServers/' + action.payload.id,
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
          requestDeleteStunServerSuccess(result.data)
        :
          requestDeleteStunServerError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteStunServerError(error))
      })
    )
  )
)

export const requestDeleteStunServerSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_STUN_SERVER_SUCCESS'),
  switchMap(() => of(requestStunServers()))
)

export const requestEmergencySipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_EMERGENCY_SIP_ACCOUNTS'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/sip/emergency/accounts',   
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
          requestEmergencySipAccountsSuccess(result.data)
        :
          requestEmergencySipAccountsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestEmergencySipAccountsError(error))
      })
    )
  )
)

export const requestAddEmergencySipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADD_EMERGENCY_SIP_ACCOUNT'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/sip/emergency/accounts',
      {
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
          requestAddEmergencySipAccountSuccess(result.data)
        :
          requestAddEmergencySipAccountError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddEmergencySipAccountError(error))
      })
    )
  )
)

export const requestDeleteAllEmergencySipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS'),
  switchMap(() =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/emergency/accounts/all',   
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
          requestDeleteAllEmergencySipAccountsSuccess(result.data)
        :
          requestDeleteAllEmergencySipAccountsError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAllEmergencySipAccountsError(error))
      })
    )
  )
)

export const requestDeleteAllEmergencySipAccountsSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ALL_EMERGENCY_SIP_ACCOUNTS_SUCCESS'),
  switchMap(() => of(requestEmergencySipAccounts()))
)

export const requestDeleteEmergencySipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/sip/emergency/accounts/' + action.payload.id,
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
          requestDeleteEmergencySipAccountSuccess(result.data)
        :
          requestDeleteEmergencySipAccountError(result.data)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteEmergencySipAccountError(error))
      })
    )
  )
)

export const requestDeleteEmergencySipAccountSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_EMERGENCY_SIP_ACCOUNT_SUCCESS'),
  switchMap(() => of(requestEmergencySipAccounts()))
)

export const requestDownloadSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_SETTINGS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/settings/dump',   
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

          return requestDownloadSettingsSuccess(result.data)
        } else {
          requestDownloadSettingsError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadSettingsError(error))
      }),
    ),
  ),
)

export const requestLoadSettingsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOAD_SETTINGS'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/settings/restore', action.payload.file,   
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
          requestLoadSettingsSuccess(result.id)
        :
          requestLoadSettingsError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestLoadSettingsError(error))
      })
    )
  ),
);

export const requestUpdateFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FIRMWARE'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/utils/updateFirmware', action.payload.file,   
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
          requestUpdateFirmwareSuccess(result.id)
        :
          requestUpdateFirmwareError(result.error)
      ),
      catchError((error) => {
        console.log(error);
        return of(requestUpdateFirmwareError(error))
      })
    )
  ),
);

export default [
  requestIntercomInfoEpic,
  requestIntercomSettingsEpic,
  requestLineSignalEpic,
  requestLineSignalSuccessEpic,
  requestOpenDoorEpic,
  requestResetSetiingsEpic,
  requestUpdateIntercomSettingsEpic,
  requestFlatsCredentialEpic,
  requestUpdateFlatsCredentialEpic,
  requestResetFlatsCredentialEpic,
  requestFlatsCredentialTurnEpic,
  requestUpdateFlatsCredentialTurnEpic,
  requestResetFlatsCredentialTurnEpic,
  requestEmergencyCredentialEpic,
  requestUpdateEmergencyCredentialEpic,
  requestResetEmergencyCredentialEpic,
  requestEmergencyCredentialTurnEpic,
  requestUpdateEmergencyCredentialTurnEpic,
  requestResetEmergencyCredentialTurnEpic,
  requestStunServersEpic,
  requestAddStunServerEpic,
  requestDeleteAllStunServersEpic,
  requestDeleteAllStunServersSuccessEpic,
  requestDeleteStunServerEpic,
  requestDeleteStunServerSuccessEpic,
  requestEmergencySipAccountsEpic,
  requestAddEmergencySipAccountEpic,
  requestDeleteAllEmergencySipAccountsEpic,
  requestDeleteAllEmergencySipAccountsSuccessEpic,
  requestDeleteEmergencySipAccountEpic,
  requestDeleteEmergencySipAccountSuccessEpic,
  requestRebootIntercomEpic,
  requestRebootIntercomSuccessEpic,
  requestDownloadSettingsEpic,
  requestLoadSettingsEpic,
  requestUpdateFirmwareEpic,
]
