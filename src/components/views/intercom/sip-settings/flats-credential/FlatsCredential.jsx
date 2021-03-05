import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import InputField from '../../../../subcomponents/input-field/InputField'
import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import SelectField from '../../../../subcomponents/select-field/SelectField'
import SaveSettingsButtons from '../../../../subcomponents/save-settings-buttons/SaveSettingsButtons'
import ConnectionTypes from '../../../../../constants/ConnectionTypes'
import testRegex from '../../../../../utils/string/testRegex'

import './FlatsCredential.css'

const FlatsCredential = (props) => {
  const {
    flatsCredential,
    requestFlatsCredential,
    requestUpdateFlatsCredential,
    requestResetFlatsCredential,
    requestFlatsCredentialTurn,
    requestUpdateFlatsCredentialTurn,
    requestResetFlatsCredentialTurn,
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

    requestFlatsCredential()
    requestFlatsCredentialTurn()
  }, [requestFlatsCredential, requestFlatsCredentialTurn])

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

    requestUpdateFlatsCredential({
      server: flatsCredential.server,
      login: flatsCredential.login,
      password: flatsCredential.password,
      useStun: flatsCredential.useStun,
      useStunMedia: flatsCredential.useStunMedia,
      useIce: flatsCredential.useIce,
      useTurn: flatsCredential.useTurn,
    })
  }

  const handleResetSettings = () => {

    requestResetFlatsCredential()
  }

  const handleSaveTurnSettings = () => {

    requestUpdateFlatsCredentialTurn({
      server: flatsCredential.turnServer.server,
      connectionType: flatsCredential.turnServer.connectionType,
      login: flatsCredential.turnServer.login,
      password: flatsCredential.turnServer.password,
    })
  }

  const handleResetTurnSettings = () => {

    requestResetFlatsCredentialTurn()
  }

  const handleChangePasswordValidity = (bool) => {
    
    setIsPasswordValid(bool)
  }

  const handleChangeTurnPasswordValidity = (bool) => {
    
    setIsTurnPasswordValid(bool)
  }
  
  return (
    <Collapsible
      trigger="SIP аккаунт для звонка в квартиры"
      className='b-flat-call-sip-account b-sip-settings__inner-list'
      openedClassName='b-flat-call-sip-account b-sip-settings__inner-list'
    >
      <div className='b-sip-settings__inner-list-main-inputs'>
        <InputField
          label='Сервер:'
          type='text'
          value={flatsCredential.server}
          onChange={handleServerChange}
          error={!isServerInputValid}
          helperText={!isServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
        />
        <InputField
          label='Логин:'
          type='text'
          value={flatsCredential.login || ''}
          onChange={handleLoginChange}
        />
        <input name='password' className='b-input-field__empty-input' />
        <InputField
          label='Пароль:'
          type='password'
          value={flatsCredential.password || ''}
          onChange={handlePasswordChange}
          changePasswordValidity={(bool) => handleChangePasswordValidity(bool)}
        />
      </div>
      <div className='b-flat-call-sip-account__radio-buttons'>
        <RadioButton
          label='Использовать STUN'
          value={flatsCredential.useStun}
          onChange={handleUseStunChange}
        />
        {
          flatsCredential.useStun
          &&
            <RadioButton
              label='Использовать STUN media transports'
              value={flatsCredential.useStunMedia}
              onChange={handleUseStunMediaChange}
            />
        }
        <RadioButton
          label='Использовать ICE'
          value={flatsCredential.useIce}
          onChange={handleUseIceChange}
        />
        <RadioButton
          label='Использовать TURN'
          value={flatsCredential.useTurn}
          onChange={handleUseTurnChange}
        />
      </div>
      <SaveSettingsButtons
        saveSettings={handleSaveSettings}
        resetSettings={handleResetSettings}
        disabled={
          flatsCredential.server === ''   || 
          flatsCredential.login === ''    ||
          flatsCredential.password === '' ||
          !isServerInputValid || 
          !isPasswordValid
        }
      />
      {
        flatsCredential.useTurn
        &&
          <div className='b-flat-call-sip-account__credentials-turn-server'>
            <h4>TURN сервер</h4>
            <div className='b-sip-settings__inner-list-turn-inputs'>
              <InputField
                label='Сервер:'
                type='text'
                value={flatsCredential.turnServer.server}
                onChange={handleTurnServerServerChange}
                error={!isTurnServerInputValid}
                helperText={!isTurnServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
              />
              <SelectField
                label='Тип присоединения'
                selectedValue={flatsCredential.turnServer.connectionType}
                values={ConnectionTypes}
                onChange={handleTurnServerConnectionTypeChange}
              />
              <InputField
                label='Логин:'
                type='text'
                value={flatsCredential.turnServer.login || ''}
                onChange={handleTurnServerLoginChange}
              />
              <input name='password' className='b-input-field__empty-input' />
              <InputField
                label='Пароль :'
                type='password'
                value={flatsCredential.turnServer.password || ''}
                onChange={handleTurnServerPasswordChange}
                changePasswordValidity={(bool) => handleChangeTurnPasswordValidity(bool)}
              />
            </div>
            <SaveSettingsButtons
              saveSettings={handleSaveTurnSettings}
              resetSettings={handleResetTurnSettings}
              disabled={
                flatsCredential.turnServer.server === ''   || 
                flatsCredential.turnServer.login === ''    ||
                flatsCredential.turnServer.password === '' ||
                !isTurnServerInputValid ||
                !isTurnPasswordValid
              }
            />
          </div>
      }
    </Collapsible>
  )
}

export default FlatsCredential
