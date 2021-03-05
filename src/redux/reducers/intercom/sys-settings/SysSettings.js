import ConnectionTypes from '../../../../constants/ConnectionTypes'

export const initialState = {
	enabled: false,
	server: '',
	connectionType: ConnectionTypes.UDP
}

const SysSettingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_INTERCOM_SETTINGS_SUCCESS':
			return {
				...state,
				enabled: action.payload.response.syslogSettings.enabled,
				server: action.payload.response.syslogSettings.server,
				connectionType: action.payload.response.syslogSettings.connectionType,
			}
		case 'CHANGE_SYS_LOG_SERVER_ENABLED':
			return {
				...state,
				enabled: !state.enabled
			}

		case 'CHANGE_SYS_SERVER':
			return {
				...state,
				server: action.payload.server
			}

		case 'CHANGE_SYS_CONNECTION_TYPE':
			return {
				...state,
				connectionType: action.payload.type
			}

		default: 
			return state
	}
}

export default SysSettingsReducer
