import React, { useState } from 'react'
import Collapsible from 'react-collapsible'
import InputField from '../../../../subcomponents/input-field/InputField'
import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import SelectField from '../../../../subcomponents/select-field/SelectField'
import SaveSettingsButtons from '../../../../subcomponents/save-settings-buttons/SaveSettingsButtons'
import ConnectionTypes from '../../../../../constants/ConnectionTypes'
import testRegex from '../../../../../utils/string/testRegex'

import './EmergencyCredential.css'

const EmergencyCredential = (props) => {
  const {
    emergencyCredential,
    requestEmergencyCredential,
    requestUpdateEmergencyCredential,
    requestResetEmergencyCredential,
    requestEmergencyCredentialTurn,
    requestUpdateEmergencyCredentialTurn,
    requestResetEmergencyCredentialTurn,
    changeServer,
    changeLogin,
    changePassword,
    changeUseStun,
    changeUseStunMedia,
    changeUseIce,
    changeUseTurn,
    changeTurnServerServer,
    changeTurnServerConnectionType,
    changeTurnServerLogin,
    changeTurnServerPassword,
  } = props;

  React.useEffect(() => {

    requestEmergencyCredential()
    requestEmergencyCredentialTurn()
  }, [requestEmergencyCredential, requestEmergencyCredentialTurn])

  const [isServerInputValid, setIsServerInputValid]         = useState(true);
  const [isTurnServerInputValid, setIsTurnServerInputValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid]               = useState(true);
  const [isTurnPasswordValid, setIsTurnPasswordValid]       = useState(true);

  const handleServerChange = (event) => {
    const value = event.target.value;

    testRegex(value, /^[\w.]*(:\d*)?$/)
    ?
      setIsServerInputValid(true)
    :
      setIsServerInputValid(false)

    changeServer(value)
  }

  const handleLoginChange = (event) => {

    changeLogin(event.target.value)
  }

  const handlePasswordChange = (event) => {

    changePassword(event.target.value)
  }

  const handleUseStunChange = () => {

    changeUseStun()
  }

  const handleUseStunMediaChange = () => {

    changeUseStunMedia()
  }

  const handleUseIceChange = () => {

    changeUseIce()
  }

  const handleUseTurnChange = () => {

    changeUseTurn()
  }

  const handleTurnServerServerChange = (event) => {
    const value = event.target.value;

    testRegex(value, /^[\w.]*(:\d*)?$/)
    ?
      setIsTurnServerInputValid(true)
    :
      setIsTurnServerInputValid(false)
    
    changeTurnServerServer(value)
  }

  const handleTurnServerConnectionTypeChange = (event) => {

    changeTurnServerConnectionType(event.target.value)
  }

  const handleTurnServerLoginChange = (event) => {

    changeTurnServerLogin(event.target.value)
  }

  const handleTurnServerPasswordChange = (event) => {

    changeTurnServerPassword(event.target.value)
  }

  const handleSaveSettings = () => {

    requestUpdateEmergencyCredential({
      server: emergencyCredential.server,
      login: emergencyCredential.login,
      password: emergencyCredential.password,
      useStun: emergencyCredential.useStun,
      useStunMedia: emergencyCredential.useStunMedia,
      useIce: emergencyCredential.useIce,
      useTurn: emergencyCredential.useTurn,
    })
  }

  const handleResetSettings = () => {

    requestResetEmergencyCredential()
  }

  const handleSaveTurnSettings = () => {
    
    requestUpdateEmergencyCredentialTurn({
      server: emergencyCredential.turnServer.server,
      connectionType: emergencyCredential.turnServer.connectionType,
      login: emergencyCredential.turnServer.login,
      password: emergencyCredential.turnServer.password,
    })
  }

  const handleResetTurnSettings = () => {

    requestResetEmergencyCredentialTurn()
  }

  const handleChangePasswordValidity = (bool) => {
    
    setIsPasswordValid(bool)
  }

  const handleChangeTurnPasswordValidity = (bool) => {
    
    setIsTurnPasswordValid(bool)
  }

  return (
    <Collapsible
      trigger="SIP аккаунт для звонка в экстренную службу"
      className='b-emergency-call-sip-account b-sip-settings__inner-list'
      openedClassName='b-emergency-call-sip-account b-sip-settings__inner-list'
    >
      <div className='b-sip-settings__inner-list-main-inputs'>
        <InputField
          label='Сервер:'
          type='text'
          value={emergencyCredential.server}
          onChange={handleServerChange}
          error={!isServerInputValid}
          helperText={!isServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
        />
        <InputField
          label='Логин:'
          type='text'
          value={emergencyCredential.login || ''}
          onChange={handleLoginChange}
        />
        <input name='password' className='b-input-field__empty-input' />
        <InputField
          label='Пароль:'
          type='password'
          value={emergencyCredential.password || ''}
          onChange={handlePasswordChange}
          changePasswordValidity={(bool) => handleChangePasswordValidity(bool)}
        />
      </div>
      <div className='b-emergency-call-sip-account__radio-buttons'>
        <RadioButton
          label='Использовать STUN'
          value={emergencyCredential.useStun}
          onChange={handleUseStunChange}
        />
        {
          emergencyCredential.useStun
          &&
            <RadioButton
              label='Использовать STUN media transports'
              value={emergencyCredential.useStunMedia}
              onChange={handleUseStunMediaChange}
            />
        }
        <RadioButton
          label='Использовать ICE'
          value={emergencyCredential.useIce}
          onChange={handleUseIceChange}
        />
        <RadioButton
          label='Использовать TURN'
          value={emergencyCredential.useTurn}
          onChange={handleUseTurnChange}
        />
      </div>
      <SaveSettingsButtons
        saveSettings={handleSaveSettings}
        resetSettings={handleResetSettings}
        disabled={
          emergencyCredential.server === ''   || 
          emergencyCredential.login === ''    ||
          emergencyCredential.password === '' ||
          !isServerInputValid || 
          !isPasswordValid
        }
      />
      {
        emergencyCredential.useTurn
        &&
          <div className='b-emergency-credential__credentials-turn-server'>
            <h4 className='b-emergency-call-sip-account__turn-server-header--mt-huge'>
              TURN сервер
            </h4>
            <div className='b-sip-settings__inner-list-turn-inputs'>
              <InputField
                label='Сервер:'
                type='text'
                value={emergencyCredential.turnServer.server}
                onChange={handleTurnServerServerChange}
                error={!isTurnServerInputValid}
                helperText={!isTurnServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
              />
              <SelectField
                label='Тип присоединения'
                selectedValue={emergencyCredential.turnServer.connectionType}
                values={ConnectionTypes}
                onChange={handleTurnServerConnectionTypeChange}
              />
              <InputField
                label='Логин:'
                type='text'
                value={emergencyCredential.turnServer.login || ''}
                onChange={handleTurnServerLoginChange}
              />
              <input name='password' className='b-input-field__empty-input' />
              <InputField
                label='Пароль:'
                type='password'
                value={emergencyCredential.turnServer.password || ''}
                onChange={handleTurnServerPasswordChange}
                changePasswordValidity={(bool) => handleChangeTurnPasswordValidity(bool)}
              />
            </div>
            <SaveSettingsButtons
              saveSettings={handleSaveTurnSettings}
              resetSettings={handleResetTurnSettings}
              disabled={
                emergencyCredential.turnServer.server === ''   || 
                emergencyCredential.turnServer.login === ''    ||
                emergencyCredential.turnServer.password === '' ||
                !isTurnServerInputValid ||
                !isTurnPasswordValid
              }
            />
          </div>
      }
    </Collapsible>
  )
}

export default EmergencyCredential
