import React, { useState } from 'react'
import 'date-fns'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { 
  MuiPickersUtilsProvider, 
  DateTimePicker 
} from "@material-ui/pickers"

import RangeField from '../../../subcomponents/range-field/RangeField'
import InputField from '../../../subcomponents/input-field/InputField'
import RadioButton from '../../../subcomponents/radio-button/RadioButton'
import SelectField from '../../../subcomponents/select-field/SelectField'
import Slider from '../../../subcomponents/slider/Slider'
import TooltipWrapper from '../../../subcomponents/tooltip/Tooltip'
import CommutatorTypes from '../../../../constants/CommutatorTypes'
import convertTimeZone from '../../../../utils/string/convertTimeZone'
import testRegex from '../../../../utils/string/testRegex'

import './MainSettings.css'

const momentTimezone = require('moment-timezone');

const MainSettings = (props) => {
  const {
    mainSettings,
    intercomSettingsWasReseted,
    toggleIntercomSettingsWasReseted,
    changeCommutatorType,
    changeTimeZone,
    changeDatetime,
    changeNtpEnabled,
    changeNtpServer,
    changeCollectKey,
    changeFlatsFirstNumber,
    changeFlatsLastNumber,
    changeFaceRecognitionThreshold,
    changeMinLineThresholdsNumber,
    changeMaxLineThresholdsNumber,
    changeRingDuration,
    changeCallDuration,
    changeDoorOpenDuration,
    requestLineSignal,
  } = props;

  const timeSettings     = mainSettings.timeSettings;
  const flatsSettings    = mainSettings.flatsSettings;
  const durationSettings = mainSettings.durationSettings;

  const ringDuration = durationSettings.ring;
  const callDuration = durationSettings.call;
  const doorOpenDuration = durationSettings.doorOpen;

  const firstFlatNumber = flatsSettings.firstNumber;
  const lastFlatNumber  = flatsSettings.lastNumber; 

  const minLineThreshold = Number(flatsSettings.lineThresholds.min);
  const maxLineThreshold = Number(flatsSettings.lineThresholds.max);
  
  const numberForCounting = (maxLineThreshold - minLineThreshold) / 2;
  
  const [autoVoltages, setAutoVoltages] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState('');

  const [faceRecognitionThreshold, setFaceRecognitionThreshold] = useState('');

  const [staticVoltage, setStaticVoltage]             = useState('');
  const [buttonPushedVoltage, setButtonPushedVoltage] = useState('');
  const [tubeLiftedVoltage, setTubeLiftedVoltage]     = useState('');

  const [isOneOfVoltagesChanged, setIsOneOfVoltagesChanged] = useState(false);
  const [durationsForCheck, setDurationsForCheck]           = useState({
    ring: '',
    call: '',
    doorOpen: '',
  });

  const [isDateChanged, setIsDateChanged] = useState(false);
  const [dateForPicker, setDateForPicker] = useState('');
  
  React.useEffect(() => {
    
    if (!isOneOfVoltagesChanged || intercomSettingsWasReseted) {

      const staticVoltage = (minLineThreshold - numberForCounting) < 0 ? 0 : minLineThreshold - numberForCounting;

      setStaticVoltage(minLineThreshold === 0 ? '0' : staticVoltage)
      setButtonPushedVoltage(minLineThreshold + numberForCounting)
      setTubeLiftedVoltage(maxLineThreshold + numberForCounting)

      intercomSettingsWasReseted && toggleIntercomSettingsWasReseted()
    }
  }, [
    isOneOfVoltagesChanged, 
    intercomSettingsWasReseted, 
    minLineThreshold, 
    maxLineThreshold, 
    numberForCounting,
    toggleIntercomSettingsWasReseted,
  ])

  React.useEffect(() => {

    !isDateChanged && setDateForPicker(convertTimeZone(timeSettings.datetime))
  }, [isDateChanged, timeSettings.datetime])

  React.useEffect(() => {

    setFaceRecognitionThreshold((mainSettings.faceRecognitionThreshold))
  }, [mainSettings.faceRecognitionThreshold])

  let flats = [];
  
  if (firstFlatNumber !== '' && Number(lastFlatNumber)) {

    for (
      let i = Number(firstFlatNumber); 
      i <= Number(lastFlatNumber); 
      i++
    ) {

      flats.push(i)
    }
  }
  
  const handleCommutatorTypeChange = (event) => {

    changeCommutatorType(event.target.value)
  }

  const handleTimeZoneChange = (event) => {
    
    changeTimeZone(event.target.value)
  }

  const handleNtpEnabledChange = () => {

    changeNtpEnabled()
  }
  
  const handleDateChange = (dateTime) => {
    setIsDateChanged(true)
    setDateForPicker(dateTime)

    let date = moment(dateTime).format();

    date.indexOf('+') !== -1
    ?
      date = date.substring(0, date.indexOf('+'))
    :
      date = date.substring(0, date.indexOf('-'))

    changeDatetime(date + '+00:00')
  }

  const handleSetTimeFromDevice = (event) => {
    event.preventDefault()
    
    handleDateChange(new Date())
  }

  const handleNtpServerChange = (event) => {

    changeNtpServer(event.target.value)
  }

  const handleAutoVoltagesChange = () => {

    setAutoVoltages(!autoVoltages)
  }

  const handleFlatChange = (event) => {
    const flatNumber = event.target.value;
    
    setSelectedFlat(flatNumber)
  }

  const handleCalcVoltages = () => {

    requestLineSignal(selectedFlat)
  }

  const handleCollectKeyChange = () => {
    
    changeCollectKey()
  }

  const checkIfZeroWithNumber = (value) => {
    const splitedValue = value.split('');
    
    return splitedValue[1] && splitedValue[0] && splitedValue[0] === '0'
  }
  
  const handleFlatsRangeChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (
      testRegex(value, /^[0-9]+$/) && 
      value <= 65535 && 
      !checkIfZeroWithNumber(value)
    ) {

      if (name === 'firstNumber') {
        changeFlatsFirstNumber(value)
        setSelectedFlat(value)
      } else if (name === 'lastNumber') {
        changeFlatsLastNumber(value)
      }    
    }
  }

  const handleFaceRecognitionThresholdChange = (event, faceRecognitionThreshold) => {

    setFaceRecognitionThreshold(faceRecognitionThreshold)
  }

  const handleFaceRecognitionThresholdBlur = () => {

    changeFaceRecognitionThreshold(faceRecognitionThreshold)
  }

  const checkIfDurationCorrect = (value) => {

    return (
      testRegex(value, /^[0-9]+$/) && 
      value <= 429496 && 
      !checkIfZeroWithNumber(value)
    ) 
  }

  const handleRingDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      ring: value,
    })
    
    checkIfDurationCorrect(value)
    &&
      changeRingDuration(value === '' ? '' : (value * 1000))   
  }

  const handleCallDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      call: value,
    })

    checkIfDurationCorrect(value)
    &&
      changeCallDuration(value === '' ? '' : (value * 1000))   
  }

  const handleDoorOpenDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      doorOpen: value,
    })

    checkIfDurationCorrect(value)
    &&
      changeDoorOpenDuration(value === '' ? '' : (value * 1000))
  }

  const setDuration = (duration, durationForCheck) => {    
    
    if (duration === '') {
      return ''
    } else if (durationForCheck === '00') {
      return '0'
    } else {
      return Math.floor(duration / 1000)
    }
  }

  const checkIfVoltageCorrect = (value) => {
    
    if (
      testRegex(value, /^[0-9.]+$/) && 
      value <= 65535 && 
      !checkIfZeroWithNumber(value)
    ) {
      setIsOneOfVoltagesChanged(true)
      return true
    } else {
      return false
    }
  }

  const setLineThresholdsNumbers = (sortedVoltages) => {

    const minLineThreshold = (sortedVoltages[0] + sortedVoltages[1]) / 2;
    const maxLineThreshold = (sortedVoltages[1] + sortedVoltages[2]) / 2; 

    changeMinLineThresholdsNumber(Math.ceil(minLineThreshold))
    changeMaxLineThresholdsNumber(Math.ceil(maxLineThreshold))
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

      setLineThresholdsNumbers(sortedVoltages)
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

      setLineThresholdsNumbers(sortedVoltages)
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

      setLineThresholdsNumbers(sortedVoltages)
    }
  }

  return (
    <>  
      <SelectField 
        label='Тип коммутатора:'
        selectedValue={mainSettings.commutatorType}
        values={CommutatorTypes}
        onChange={handleCommutatorTypeChange}          
      />
      <RadioButton 
        label='Режим сбора ключей'
        value={mainSettings.collectKeysMode}
        className='b-main-settings__collection-key'
        onChange={handleCollectKeyChange}
      /> 
      <div className='b-main-settings__flats-range'>
        <RangeField 
          label='Диапозон квартир:'
          minNumberName='firstNumber'
          maxNumberName='lastNumber'
          minNumberValue={firstFlatNumber}
          maxNumberValue={lastFlatNumber}
          onChange={handleFlatsRangeChange}
        />
      </div> 
      <Slider
        header='Точность распознавания лица:'
        className='b-main-settings__face-recognition-threshold'
        value={faceRecognitionThreshold}
        min={0}
        max={100}
        step={1}
        marks={false}
        onBlur={handleFaceRecognitionThresholdBlur}
        onChange={(e, value) => handleFaceRecognitionThresholdChange(e, value.toString())}
      />
      <div className='b-main-settings__time-settings'>
        <h4>Настройки времени</h4>
        <SelectField 
          label='Часовой пояс:'
          selectedValue={`${timeSettings.timezone}`}
          values={momentTimezone.tz.names()}
          onChange={handleTimeZoneChange}          
        />
        <RadioButton 
          label='Настройка времени через NTP сервер'
          value={timeSettings.ntpEnabled}
          className='b-main-settings__collection-key'
          onChange={handleNtpEnabledChange}
        /> 
        {
          !timeSettings.ntpEnabled
          ?
            <div className='b-main-settings__date-picker'>
              <p>
                <small>Выбор даты и времени</small>
              </p>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={dateForPicker || moment()}
                  format="DD/MM/YYYY HH:mm"
                  cancelLabel='Отмена'
                  okLabel='Ок'
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <button
                className='b-button b-main-settings__date-picker-device-time'
                onClick={handleSetTimeFromDevice}
              >
                Установить время с устройства
              </button>
            </div>
          :
            <InputField 
              label='NTP сервер:'
              type='text'
              value={timeSettings.ntpServer}
              onChange={handleNtpServerChange}
            />
        }
      </div>
      <div className='b-main-settings__voltages-wrapper'>
        <div className='b-main-settings__voltages-header'>
          <h4>
            Напряжения (0 - 65535)
          </h4>
          <TooltipWrapper 
            title='
              Данные параметры необходимы для расчета минимального и максимального
              значений порога линейного сигнала. Минимальное значение есть среднее
              арифметическое между минимальным и средним параметрами напряжений, 
              максимальное - между средним и максимальным параметрами. Затем, на основе
              полученных значений порогов вычисляются напряжения на линии, путем умножения
              каждого из них на 186.
            ' 
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
              <SelectField 
                label='Квартира, в которой вы находитесь:'
                selectedValue={selectedFlat}
                values={flats}
                onChange={handleFlatChange}          
              />
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
      </div>
      <h4>Продолжительности, в секундах (0 - 429496)</h4>
      <div className='b-main-settings__flats-duration'>
        <InputField 
          label='Максимальная продолжительность звонка:'
          type='number'
          value={setDuration(ringDuration, durationsForCheck.ring)}
          onChange={handleRingDurationChange}
        />
        <InputField 
          label='Максимальная продолжительность разговора):'
          type='number'
          value={setDuration(callDuration, durationsForCheck.call)}
          onChange={handleCallDurationChange}
        />
        <InputField 
          label='Максимальное время, через которое дверь закроется:'
          type='number'
          value={setDuration(doorOpenDuration, durationsForCheck.doorOpen)}
          onChange={handleDoorOpenDurationChange}
        />
      </div>
    </>
  )
}

export default MainSettings
