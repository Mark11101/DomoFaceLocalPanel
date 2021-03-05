import React from 'react'

import RadioButton from '../../../subcomponents/radio-button/RadioButton'
import InputField from '../../../subcomponents/input-field/InputField'
import ConnectionTypes from '../../../../constants/ConnectionTypes'
import SelectField from '../../../subcomponents/select-field/SelectField'
import testRegex from '../../../../utils/string/testRegex'

import './SysSettings.css'

const SysSettings = (props) => {
  const {
		sysSettings,
    changeSyslogServerEnabled,
    changeSysServer,
    changeSysConnectionType,
	} = props;

  const [isSysServerInputValid, setIsSysServerInputValid] = React.useState(true);

  const handleSyslogServerEnabledChange = () => {

    changeSyslogServerEnabled()
  }

  const handleSysServerChange = (event) => {
		const value = event.target.value;
		
		testRegex(value, /^[\w.]*(:\d*)?$/)
		?
			setIsSysServerInputValid(true)
		:
			setIsSysServerInputValid(false)

    changeSysServer(value)
  }

  const handleSysConnectionTypeChange = (event) => {

    changeSysConnectionType(event.target.value)
	}
	
	return (
		<>
			<RadioButton 
				label='Сервер доступен'
				value={sysSettings.enabled}
				className='b-main-settings__collection-key'
				onChange={handleSyslogServerEnabledChange}
			/> 
			<InputField
				label='Сервер:'
				type='text'
				value={sysSettings.server}
				onChange={handleSysServerChange}
				error={!isSysServerInputValid}
				helperText={!isSysServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
			/>
			<SelectField
				label='Тип присоединения'
				selectedValue={`${sysSettings.connectionType}`}
				values={ConnectionTypes}
				onChange={handleSysConnectionTypeChange}
			/>
		</>
	)
}

export default SysSettings
