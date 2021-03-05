import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Collapsible from 'react-collapsible'
import Modal from 'react-bootstrap/Modal'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import SearchIcon from '@material-ui/icons/Search'

import FlatSipAccounts from './flat-sip-accounts/FlatSipAccountsContainer'
import IntercomAudioDevice from './audio-settings/intercom-audio-device/IntercomAudioDeviceContainer'
import FlatAudioDevice from './audio-settings/flat-audio-device/FlatAudioDeviceContainer'
import SipAudioDevice from './audio-settings/sip-audio-device/SipAudioDeviceContainer'
import RadioButton from '../../subcomponents/radio-button/RadioButton'
import TooltipWrapper from '../../subcomponents/tooltip/Tooltip'
import InputField from '../../subcomponents/input-field/InputField'
import Divider from '../../subcomponents/divider/Divider'

import './Flat.css'

const Flat = (props) => {
  const {
    flatSettings,
    firstFlatNumber,
    lastFlatNumber,
    flatSettingsWasReseted,
    toggleFlatSettingsWasReseted,
    settingsWasGetted,
    changeNumber,
    changeUseCustomSettings,
    changeBlockCalls,
    changeFlatLineThresholdsMinNumber,
    changeFlatLineThresholdsMaxNumber,  
    requestFlatSettings,
    requestUpdateFlatSettings,
    requestResetFlatSettings,
    requestResetAllFlatsSettings,
    requestLineSignal,
  } = props;
  
  const mainSettings        = flatSettings.mainSettings;
  const intercomAudioDevice = flatSettings.audioSettings.intercomAudioDevice;
  const flatAudioDevice     = flatSettings.audioSettings.flatAudioDevice;
  const sipAudioDevice      = flatSettings.audioSettings.sipAudioDevice;
  
  const minLineThreshold = mainSettings.lineThresholds.min;
  const maxLineThreshold = mainSettings.lineThresholds.max;
  
  const numberForCounting = (maxLineThreshold - minLineThreshold) / 2;
  
  const [staticVoltage, setStaticVoltage]             = useState('');
  const [buttonPushedVoltage, setButtonPushedVoltage] = useState('');
  const [tubeLiftedVoltage, setTubeLiftedVoltage]     = useState('');

  const [isOneOfVoltagesChanged, setIsOneOfVoltagesChanged] = useState(false);

  const firstNumber = Number(firstFlatNumber);
  const lastNumber  = Number(lastFlatNumber);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchKeyValue, setSearchKeyValue] = useState('');

  const [autoVoltages, setAutoVoltages] = useState(false);
  
  React.useEffect(() => {
    
    if (!isOneOfVoltagesChanged || flatSettingsWasReseted) {

      const staticVoltage = (minLineThreshold - numberForCounting) < 0 ? 0 : minLineThreshold - numberForCounting;
      
      setStaticVoltage(minLineThreshold === 0 ? '0' : staticVoltage)
      setButtonPushedVoltage(minLineThreshold + numberForCounting)
      setTubeLiftedVoltage(maxLineThreshold + numberForCounting)

      flatSettingsWasReseted && toggleFlatSettingsWasReseted()
    }
  }, [
    isOneOfVoltagesChanged, 
    flatSettingsWasReseted, 
    minLineThreshold, 
    maxLineThreshold, 
    numberForCounting,
    toggleFlatSettingsWasReseted,
  ])

  const handleNumberChange = (number) => {

    changeNumber(number)
    setIsModalVisible(false)
    requestFlatSettings(number)
  }

  const handleOpenModal = () => {

    setIsModalVisible(true)
  }

  const handleCloseModal = () => {

    setIsModalVisible(false)
  }

  const handleSearchKeyValueChange = (event) => {

    setSearchKeyValue(event.target.value)
  }
  
  const flatsArray = [];

  for (let i = firstNumber; i <= lastNumber; i++) {
    if (searchKeyValue === '' || (searchKeyValue && i.toString().includes(searchKeyValue))) {
      flatsArray.push(
        <Card 
          className='b-flat__card'
          key={i}
        >
          <button
            className='b-button b-flat__flat-btn'
            onClick={() => handleNumberChange(i)}
          >
            {i}
          </button>
        </Card>
      )
    } else {
      continue
    }
  }

  const handleUseCustomSettingsChange = () => {

    changeUseCustomSettings()
  }

  const handleBlockCallsChange = () => {

    changeBlockCalls()
  }

  const handleResetSettings = () => {
    
    requestResetFlatSettings(mainSettings.number)
  }

  const handleResetAllFlatsSettings = () => {

    requestResetAllFlatsSettings(mainSettings.number)
  }

  const checkIfZeroWithNumber = (value) => {
    const splitedValue = value.split('');
    
    return splitedValue[1] && splitedValue[0] && splitedValue[0] === '0'
  }

  const checkIfVoltageCorrect = (value) => {
    const regex =  /^[0-9.]+$/gmius;
    const match = regex.exec(value) !== null;
    
    if ((match || value === '') && value <= 65535 && !checkIfZeroWithNumber(value)) {
      setIsOneOfVoltagesChanged(true)
      return true
    } else {
      return false
    }
  }

  const handleStaticVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setStaticVoltage(value)
  
      const sortedVoltages = [
        Number(value),
        Number(buttonPushedVoltage),
        Number(tubeLiftedVoltage),
      ].sort((a, b) => a - b);
  
      const minLineThreshold = (sortedVoltages[0] + sortedVoltages[1]) / 2;
      const maxLineThreshold = (sortedVoltages[1] + sortedVoltages[2]) / 2; 
  
      changeFlatLineThresholdsMinNumber(Math.ceil(minLineThreshold))
      changeFlatLineThresholdsMaxNumber(Math.ceil(maxLineThreshold))
    }

  }

  const handleButtonPushedVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setButtonPushedVoltage(value)
  
      const sortedVoltages = [
        Number(staticVoltage),
        Number(value),
        Number(tubeLiftedVoltage),
      ].sort((a, b) => a - b);
  
      const minLineThreshold = (sortedVoltages[0] + sortedVoltages[1]) / 2;
      const maxLineThreshold = (sortedVoltages[1] + sortedVoltages[2]) / 2; 
  
      changeFlatLineThresholdsMinNumber(Math.ceil(minLineThreshold))
      changeFlatLineThresholdsMaxNumber(Math.ceil(maxLineThreshold))
    }
  }

  const handleTubeLiftedVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setTubeLiftedVoltage(value)
  
      const sortedVoltages = [
        Number(staticVoltage),
        Number(buttonPushedVoltage),
        Number(value),
      ].sort((a, b) => a - b);
      
      const minLineThreshold = (sortedVoltages[0] + sortedVoltages[1]) / 2;
      const maxLineThreshold = (sortedVoltages[1] + sortedVoltages[2]) / 2; 
  
      changeFlatLineThresholdsMinNumber(Math.ceil(minLineThreshold))
      changeFlatLineThresholdsMaxNumber(Math.ceil(maxLineThreshold))
    }
  }

  const handleAutoVoltagesChange = () => {

    setAutoVoltages(!autoVoltages)
  }

  const handleCalcVoltages = () => {

    requestLineSignal(mainSettings.number, 'flat')
  }

  const handleSaveSettings = () => {

    requestUpdateFlatSettings({
      useCustomSettings: mainSettings.useCustomSettings,
      blockCalls: mainSettings.blockCalls,
      lineThresholds: {
        min: Number(mainSettings.lineThresholds.min),
        max: Number(mainSettings.lineThresholds.max),
      },
      audioSettings: {
        intercomAudioDevice: {
          microphone: {
            gain: Number(intercomAudioDevice.microphone.gain),
            agcMode: intercomAudioDevice.microphone.agcMode,
            agcModeMaxGain: Number(intercomAudioDevice.microphone.agcModeMaxGain),
            agcModeTargetLevel: Number(intercomAudioDevice.microphone.agcModeTargetLevel),
          },
          speaker: {
            flatGain: Number(intercomAudioDevice.speaker.flatGain),
            sipGain: Number(intercomAudioDevice.speaker.sipGain),
          }
        },
        flatAudioDevice: {
          microphone: {
            gain: Number(flatAudioDevice.microphone.gain),
            agcMode: flatAudioDevice.microphone.agcMode,
            agcModeMaxGain: Number(flatAudioDevice.microphone.agcModeMaxGain),
            agcModeTargetLevel: Number(flatAudioDevice.microphone.agcModeTargetLevel),
          },
          speaker: {
            sfxGain: Number(flatAudioDevice.speaker.sfxGain),
            intercomGain: Number(flatAudioDevice.speaker.intercomGain),
          }
        },
        sipAudioDevice: {
          microphone: {
            gain: Number(sipAudioDevice.microphone.gain),
            agcMode: sipAudioDevice.microphone.agcMode,
            agcModeMaxGain: Number(sipAudioDevice.microphone.agcModeMaxGain),
            agcModeTargetLevel: Number(sipAudioDevice.microphone.agcModeTargetLevel),
          },
          speaker: {
            intercomGain: Number(sipAudioDevice.speaker.intercomGain),
          }
        },
      }
    }, mainSettings.number)    
  }
  
  return (
    <>
      <Container className='b-flat'>
        <h1 className='b-flat__title'>
          Квартиры
        </h1>
        <Divider />
        {
          lastNumber === 0 || firstNumber > lastNumber
          ?
            <>
              <Divider />
              <div className='b-flat__set-flat-range'>
                Укажите корректный диапозон квартир в основных настройках домофона.
                Не забудьте сохранить настройки.
              </div>
            </>
          :
            <>
              <button
                className='b-button b-flat__choose-flat-btn'
                onClick={handleOpenModal}
              >          
                {(mainSettings.number && 'Квартира: ' + mainSettings.number) || 'Выбрать квартиру'}          
              </button>
              <>
                {
                  settingsWasGetted
                  &&
                    <>
                      <RadioButton 
                        label='Использовать пользовательские настройки'
                        className='b-flat__use-custom-settings'
                        value={mainSettings.useCustomSettings}
                        onChange={handleUseCustomSettingsChange}
                      /> 
                      {
                        mainSettings.useCustomSettings
                        &&
                          <>
                            <Collapsible 
                              trigger="Основные настройки"
                              className='b-flat__main-settings'
                              openedClassName='b-flat__main-settings'
                            >
                              <RadioButton 
                                label='Блокировать звонки'
                                value={mainSettings.blockCalls}
                                onChange={handleBlockCallsChange}
                              />  
                              <div className='b-main-settings__voltages-header mt-3'>
                                <h4>
                                  Напряжения (0 - 65535)
                                </h4>
                                <TooltipWrapper title='
                                  Данные параметры необходимы для расчета минимального и максимального
                                  значений порога линейного сигнала. Минимальное значение есть среднее
                                  арифметическое между минимальным и средним параметрами напряжений, 
                                  максимальное - между средним и максимальным параметрами. Затем, на основе
                                  полученных значений порогов вычисляются напряжения на линии, путем умножения
                                  каждого из них на 186.' 
                                />
                              </div>
                              <RadioButton 
                                label='Автоматическая настройка'
                                className='b-main-settings__voltages-auto'
                                value={autoVoltages}
                                onChange={handleAutoVoltagesChange}
                              /> 
                              {
                                autoVoltages
                                &&
                                  <>
                                    <button
                                      className='b-button b-main-settings__set-voltages-btn'
                                      onClick={handleCalcVoltages}
                                    >
                                      Вычислить напряжения
                                    </button>
                                  </>
                              }
                              <div className='b-main-settings__voltages'>
                                <InputField 
                                  label='Положенная трубка:'
                                  type='number'
                                  value={staticVoltage}
                                  onChange={handleStaticVoltageChange}
                                />
                                <InputField 
                                  label='Поднята:'
                                  type='number'
                                  value={buttonPushedVoltage}
                                  onChange={handleButtonPushedVoltageChange}
                                />
                                <InputField 
                                  label='Открытие двери:'
                                  type='number'
                                  value={tubeLiftedVoltage}
                                  onChange={handleTubeLiftedVoltageChange}
                                />
                              </div>
                            </Collapsible>
                            <Collapsible 
                              trigger="Настройки звука"
                              className='b-flat__audio-settings'
                              openedClassName='b-flat__audio-settings'
                            >
                              <IntercomAudioDevice intercomAudioDevice={intercomAudioDevice} />
                              <FlatAudioDevice flatAudioDevice={flatAudioDevice} />
                              <SipAudioDevice sipAudioDevice={sipAudioDevice} />
                            </Collapsible>
                            <div className='b-flat__control-btns'>
                              <button
                                className='b-button b-flat__save-settings-btn'
                                onClick={handleSaveSettings}
                              >
                                Сохранить настройки
                              </button>
                              <button
                                className='b-button b-flat__reset-settings-btn'
                                onClick={handleResetSettings}
                              >
                                Сбросить настройки
                              </button>
                            </div>
                          </>
                      }
                      <FlatSipAccounts number={mainSettings.number} />
                    </>
                }
              </>
            </>
        }
        <button
          className='b-button b-flat__reset-settings-btn b-flat__reset-all-flats-settings-btn'
          onClick={handleResetAllFlatsSettings}
        >
          Сбросить настройки всех квартир
        </button>
      </Container>
      <Modal 
        show={isModalVisible} 
        onHide={handleCloseModal}
        className='b-modal-form'
        centered
      >
        <Modal.Header className='b-modal-form__header'>
          <h1 className='b-modal-form__header-title'>
            Выбор квартиры
          </h1>
          <button 
            className='b-button b-modal-form__close-modal-btn'
            onClick={handleCloseModal}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body className='b-flat__modal-body'>
        {
          lastNumber > 20
          &&      
            <InputGroup className='b-flat__search-input-group'>
              <FormControl
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="basic-addon2"
                className='b-keys__search-input'
                value={searchKeyValue}
                onChange={handleSearchKeyValueChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>   
          }  
          <CardDeck className='b-flat__card-deck'>
            {flatsArray}
          </CardDeck>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Flat
