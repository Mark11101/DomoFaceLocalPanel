import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import SelectField from '../../../subcomponents/select-field/SelectField'
import RadioButton from '../../../subcomponents/radio-button/RadioButton'
import Slider from '../../../subcomponents/slider/Slider'
import CodecTypes from '../../../../constants/CodecTypes'
import MainCamResolutionTypes from '../../../../constants/MainCamResolutionTypes'
import SubCamResolutionTypes from '../../../../constants/SubCamResolutionTypes'
import BitrateTypes from '../../../../constants/BitrateTypes'
import ProfileTypes from '../../../../constants/ProfileTypes'
import FrequencyTypes from '../../../../constants/FrequencyTypes'
import appendClassName from '../../../../utils/string/appendClassName'
import Divider from '../../../subcomponents/divider/Divider'
import InputField from '../../../subcomponents/input-field/InputField'

import './CameraSettings.css'

const CameraSettings = (props) => {
  const {
    cameraSettings,
    changeMainCodec,
    changeMainResolution,
    changeMainFramerate,
    changeMainBitrateType,
    changeMainBitrate,
    changeMainGopInterval,
    changeMainQpAuto,
    changeMainQpMin,
    changeMainQpMax,
    changeSubCodec,
    changeSubResolution,
    changeSubFramerate,
    changeSubBitrateType,
    changeSubBitrate,
    changeSubGopInterval,
    changeSubQpAuto,
    changeSubQpMin,
    changeSubQpMax,
    changeProfile,
    changeFlipHorizontal,
    changeFlipVertical,
    changeFrequency,
    changeBrightness,
    changeContrast,
    changeSaturation,
    changeSharpness,
    changeWbAuto,
    changeWbManualRed,
    changeWbManualGreen,
    changeWbManualBlue,
    changeBlc,
    changeHlc,
    changeDnr2d,
    changeDnr3d,
    changeDefogging,
    changeWdr,
    changeAntiFlicker,
    changeIrAuto,
    changeIrColored,
    changeCameraPassword,
    requestEnableIrCut,
    requestDisableIrCut,
  } = props;

  const [brightness, setBrightness] = useState('');
  const [contrast, setContrast] = useState('');
  const [saturation, setSaturation] = useState('');
  const [sharpness, setSharpness] = useState('');
  const [wbManualRed, setWbManualRed] = useState('');
  const [wbManualGreen, setWbManualGreen] = useState('');
  const [wbManualBlue, setWbManualBlue] = useState('');
  const [blc, setBlc] = useState('');
  const [hlc, setHlc] = useState('');
  const [dnr2d, setDnr2d] = useState('');
  const [dnr3d, setDnr3d] = useState('');
  const [defogging, setDefogging] = useState('');
  const [wdr, setWdr] = useState('');

  React.useEffect(() => {

    setBrightness(cameraSettings.image.brightness)
    setContrast(cameraSettings.image.contrast)
    setSaturation(cameraSettings.image.saturation)
    setSharpness(cameraSettings.image.sharpness)
    setWbManualRed(cameraSettings.image.wbManualRed)
    setWbManualGreen(cameraSettings.image.wbManualGreen)
    setWbManualBlue(cameraSettings.image.wbManualBlue)
    setBlc(cameraSettings.image.blc)
    setHlc(cameraSettings.image.hlc)
    setDnr2d(cameraSettings.image.dnr2d)
    setDnr3d(cameraSettings.image.dnr3d)
    setDefogging(cameraSettings.image.defogging)
    setWdr(cameraSettings.image.wdr)
  }, [
    cameraSettings.image.brightness,
    cameraSettings.image.contrast,
    cameraSettings.image.saturation,
    cameraSettings.image.sharpness,
    cameraSettings.image.wbManualRed,
    cameraSettings.image.wbManualGreen,
    cameraSettings.image.wbManualBlue,
    cameraSettings.image.blc,
    cameraSettings.image.hlc,
    cameraSettings.image.dnr2d,
    cameraSettings.image.dnr3d,
    cameraSettings.image.defogging,
    cameraSettings.image.wdr,
  ])

  const stream = cameraSettings.stream;
  const image  = cameraSettings.image;

  const mainStream = stream.main;
  const subStream  = stream.sub;

  const handleMainCodecChange = (event) => {

    changeMainCodec(event.target.value)
  }

  const handleMainResloutionChange = (event) => {

    changeMainResolution(event.target.value)
  }

  const handleMainFramerateChange = (framerate) => {

    changeMainFramerate(framerate)
  }

  const handleMainBitrateTypeChange = (event) => {

    changeMainBitrateType(event.target.value)
  }

  const handleMainBitrateChange = (bitrate) => {

    changeMainBitrate(bitrate)
  }

  const handleMainGopIntervalChange = (gopInterval) => {

    changeMainGopInterval(gopInterval)
  }

  const handleMainQpAutoChange = () => {

    changeMainQpAuto()
  }

  const handleMainQpMinChange = (qpMin) => {

    changeMainQpMin(qpMin)
  }

  const handleMainQpMaxChange = (qpMax) => {

    changeMainQpMax(qpMax)
  }

  const handleSubCodecChange = (event) => {

    changeSubCodec(event.target.value)
  }

  const handleSubResloutionChange = (event) => {

    changeSubResolution(event.target.value)
  }

  const handleSubFramerateChange = (framerate) => {

    changeSubFramerate(framerate)
  }

  const handleSubBitrateTypeChange = (event) => {

    changeSubBitrateType(event.target.value)
  }

  const handleSubBitrateChange = (bitrate) => {

    changeSubBitrate(bitrate)
  }

  const handleSubGopIntervalChange = (gopInterval) => {

    changeSubGopInterval(gopInterval)
  }

  const handleSubQpAutoChange = () => {

    changeSubQpAuto()
  }

  const handleSubQpMinChange = (qpMin) => {

    changeSubQpMin(qpMin)
  }

  const handleSubQpMaxChange = (qpMax) => {

    changeSubQpMax(qpMax)
  }

  const handleProfileChange = (event) => {

    changeProfile(event.target.value)
  }

  const handleFlipHorizontalChange = () => {

    changeFlipHorizontal()
  }

  const handleFlipVerticalChange = () => {

    changeFlipVertical()
  }

  const handleFrequencyChange = (event) => {

    changeFrequency(event.target.value)
  }

  const handleBrightnessChange = (event, brightness) => {

    setBrightness(brightness)
  }

  const convertImageValue = (value) => {

    return value
  }

  const handleBrightnessBlur = () => {

    changeBrightness(convertImageValue(brightness))
  }

  const handleContrastChange = (event, contrast) => {

    setContrast(contrast)
  }

  const handleContrastBlur = () => {

    changeContrast(convertImageValue(contrast))
  }

  const handleSaturationChange = (event, saturation) => {

    setSaturation(saturation)
  }

  const handleSaturationBlur = () => {

    changeSaturation(convertImageValue(saturation))
  }

  const handleSharpnessChange = (event, sharpness) => {

    setSharpness(sharpness)
  }

  const handleSharpnessBlur = () => {

    changeSharpness(convertImageValue(sharpness))
  }

  const handleWbAutoChange = () => {

    changeWbAuto()
  }

  const handleWbManualRedChange = (event, wbManualRed) => {

    setWbManualRed(wbManualRed)
  }

  const handleWbManualRedBlur = () => {

    changeWbManualRed(convertImageValue(wbManualRed))
  }

  const handleWbManualGreenChange = (event, wbManualGreen) => {

    setWbManualGreen(wbManualGreen)
  }

  const handleWbManualGreenBlur = () => {

    changeWbManualGreen(convertImageValue(wbManualGreen))
  }

  const handleWbManualBlueChange = (event, wbManualBlue) => {

    setWbManualBlue(wbManualBlue)
  }

  const handleWbManualBlueBlur = () => {

    changeWbManualBlue(convertImageValue(wbManualBlue))
  }

  const handleBlcChange = (event, blc) => {

    setBlc(blc)
  }

  const handleBlcBlur = () => {

    changeBlc(convertImageValue(blc))
  }

  const handleHlcChange = (event, hlc) => {

    setHlc(hlc)
  }

  const handleHlcBlur = () => {

    changeHlc(convertImageValue(hlc))
  }

  const handleDnr2dChange = (event, dnr2d) => {

    setDnr2d(dnr2d)
  }

  const handleDnr2dBlur = () => {

    changeDnr2d(convertImageValue(dnr2d))
  }

  const handleDnr3dChange = (event, dnr3d) => {

    setDnr3d(dnr3d)
  }

  const handleDnr3dBlur = () => {

    changeDnr3d(convertImageValue(dnr3d))
  }

  const handleDefoggingChange = (event, defogging) => {

    setDefogging(defogging)
  }

  const handleDefoggingBlur = () => {

    changeDefogging(convertImageValue(defogging))
  }

  const handleWdrChange = (event, wdr) => {

    setWdr(wdr)
  }

  const handleWdrBlur = () => {

    changeWdr(convertImageValue(wdr))
  }

  const handleAntiFlickerChange = () => {

    changeAntiFlicker()
  }

  const handleIrAutoChange = () => {

    changeIrAuto()
  }

  const handleIrColoredChange = () => {
    
    changeIrColored()
  }

  const handlePasswordChange = (event) => {

    changeCameraPassword(event.target.value)
  }

  const handleTurnOnIr = () => {

    requestEnableIrCut()
  }

  const handleTurnOffIr = () => {

    requestDisableIrCut()
  }

  return (
    <div className="b-camera-settings">
      <Collapsible 
        trigger="Поток"
        className='b-collapsible__inner-list b-camera-settings-stream'
        openedClassName='b-collapsible__inner-list b-camera-settings-stream'
      >
        <Stream 
          header='Основной поток'
          stream={mainStream}
          resolutionTypes={MainCamResolutionTypes}
          changeCodec={handleMainCodecChange}
          changeResolution={handleMainResloutionChange}
          changeBitrateType={handleMainBitrateTypeChange}
          changeBitrate={handleMainBitrateChange}
          changeFramerate={handleMainFramerateChange}
          changeGopInterval={handleMainGopIntervalChange}
          changeQpAuto={handleMainQpAutoChange}
          changeQpMin={handleMainQpMinChange}
          changeQpMax={handleMainQpMaxChange}
        />
        <Stream 
          header='Дополнительный поток'
          className='b-camera-settings-sub-stream'
          stream={subStream}
          resolutionTypes={SubCamResolutionTypes}
          changeCodec={handleSubCodecChange}
          changeResolution={handleSubResloutionChange}
          changeBitrateType={handleSubBitrateTypeChange}
          changeBitrate={handleSubBitrateChange}
          changeFramerate={handleSubFramerateChange}
          changeGopInterval={handleSubGopIntervalChange}
          changeQpAuto={handleSubQpAutoChange}
          changeQpMin={handleSubQpMinChange}
          changeQpMax={handleSubQpMaxChange}
        />
        <SelectField 
          label='Профиль:'
          selectedValue={stream.profile}
          values={ProfileTypes}
          onChange={handleProfileChange}          
        />
      </Collapsible>
      <Collapsible 
        trigger="Изображение"
        className='b-collapsible__inner-list b-camera-settings-image'
        openedClassName='b-collapsible__inner-list b-camera-settings-image'
      >
        <div className='b-camera-settings-image__radio-btns'>
          <RadioButton 
            label='Перевернуть по горизонтали'
            value={image.flipHorizontal}
            onChange={handleFlipHorizontalChange}
          /> 
          <RadioButton 
            label='Перевернуть по вертикали'
            className='b-camera-settings__flip-vertical'
            value={image.flipVertical}
            onChange={handleFlipVerticalChange}
          /> 
        </div>
        <SelectField 
          label='Частота:'
          className='b-camera-settings__frequency'
          selectedValue={image.frequency}
          values={FrequencyTypes}
          onChange={handleFrequencyChange}          
        />
        <Slider
          header='Яркость:'
          value={brightness}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleBrightnessBlur}
          onChange={(e, value) => handleBrightnessChange(e, value.toString())}
        />
        <Slider
          header='Контраст:'
          value={contrast}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleContrastBlur}
          onChange={(e, value) => handleContrastChange(e, value.toString())}
        />
        <Slider
          header='Насыщенность:'
          value={saturation}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleSaturationBlur}
          onChange={(e, value) => handleSaturationChange(e, value.toString())}
        />
        <Slider
          header='Резкость:'
          className='b-camera-settings__sharpness'
          value={sharpness}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleSharpnessBlur}
          onChange={(e, value) => handleSharpnessChange(e, value.toString())}
        />
        <Divider />
        <div className="b-camera-settings__wb">
          <h4 className='b-camera-settings__wb-header'>
            Баланс белого
          </h4>
          <RadioButton 
            label='Настроить автоматически'
            className='b-camera-settings__wb-auto'
            value={image.wbAuto}
            onChange={handleWbAutoChange}
          /> 
          {
            !image.wbAuto
            &&
              <>
                <Slider
                  header='Красный:'
                  value={wbManualRed}
                  min={0}
                  max={100}
                  step={1}
                  marks={false}
                  onBlur={handleWbManualRedBlur}
                  onChange={(e, value) => handleWbManualRedChange(e, value.toString())}
                />
                <Slider
                  header='Зеленый:'
                  value={wbManualGreen}
                  min={0}
                  max={100}
                  step={1}
                  marks={false}
                  onBlur={handleWbManualGreenBlur}
                  onChange={(e, value) => handleWbManualGreenChange(e, value.toString())}
                />
                <Slider
                  header='Синий:'
                  className='b-camera-settings__wb-manual-blue'
                  value={wbManualBlue}
                  min={0}
                  max={100}
                  step={1}
                  marks={false}
                  onBlur={handleWbManualBlueBlur}
                  onChange={(e, value) => handleWbManualBlueChange(e, value.toString())}
                />
              </>
          }
        </div>
        <Divider />
        <Slider
          header='BLC:'
          value={blc}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleBlcBlur}
          onChange={(e, value) => handleBlcChange(e, value.toString())}
        />
        <Slider
          header='HLC:'
          value={hlc}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleHlcBlur}
          onChange={(e, value) => handleHlcChange(e, value.toString())}
        />
        <Slider
          header='2D DNR:'
          value={dnr2d}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleDnr2dBlur}
          onChange={(e, value) => handleDnr2dChange(e, value.toString())}
        />
        <Slider
          header='3D DNR:'
          value={dnr3d}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleDnr3dBlur}
          onChange={(e, value) => handleDnr3dChange(e, value.toString())}
        />
        <Slider
          header='Антитуман:'
          value={defogging}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleDefoggingBlur}
          onChange={(e, value) => handleDefoggingChange(e, value.toString())}
        />
        <Slider
          header='WDR:'
          className='b-camera-settings__wdr'
          value={wdr}
          min={0}
          max={100}
          step={1}
          marks={false}
          onBlur={handleWdrBlur}
          onChange={(e, value) => handleWdrChange(e, value.toString())}
        />
        <div className='b-camera-settings-image__radio-btns'>
          <RadioButton 
            label='Убрать мерцание'
            value={image.antiFlicker}
            onChange={handleAntiFlickerChange}
          /> 
          <RadioButton 
            label='Цветной ИК-режим'
            value={image.irColored}
            onChange={handleIrColoredChange}
          />
          <RadioButton 
            label='Автоматический ИК-режим'
            className='b-camera-settings__ir-auto'
            value={image.irAuto}
            onChange={handleIrAutoChange}
          /> 
        </div>
        {
          !image.irAuto
          &&
            <div className='b-camera-settings__manual-ir-cut-btns'>
              <button
                className='b-button'
                onClick={handleTurnOnIr}
              >
                Включить ИК
              </button>
              <button
                className='b-button'
                onClick={handleTurnOffIr}
              >
                Отключить ИК
              </button>
            </div>
        }
      </Collapsible>          
      <InputField 
        label='Пароль:'
        type='password'
        className='b-camera-settings__password'
        value={cameraSettings.password}
        onChange={handlePasswordChange}
      />
    </div>
  )
}

const Stream = (props) => {
  const {
    header,
    stream,
    className,
    resolutionTypes,
    changeCodec,
    changeResolution,
    changeBitrateType,
    changeBitrate,
    changeFramerate,
    changeGopInterval,
    changeQpAuto,
    changeQpMin,
    changeQpMax,
  } = props;

  const [bitrate, setBitrate] = useState('');
  const [framerate, setFramerate] = useState('');
  const [gopInterval, setGopInterval] = useState('');
  const [qpMin, setQpMin] = useState('');
  const [qpMax, setQpMax] = useState('');
  
  React.useEffect(() => {

    setBitrate(stream.bitrate)
    setFramerate(stream.framerate)
    setGopInterval(stream.gopInterval)
    setQpMin(stream.qpMin)
    setQpMax(stream.qpMax)
  }, [
    stream.bitrate,
    stream.framerate,
    stream.gopInterval,
    stream.qpMin,
    stream.qpMax,
  ])

  const handleBitrateChange = (event, value) => {

    setBitrate(value)
  }

  const handleFramerateChange = (event, value) => {

    setFramerate(value)
  }

  const handleGopIntervalChange = (event, value) => {

    setGopInterval(value)
  }

  const handleQpMinChange = (event, value) => {

    setQpMin(value)
  }

  const handleQpMaxChange = (event, value) => {

    setQpMax(value)
  }

  return (
    <div className={
      className
      ?
        appendClassName('b-stream', className)
      :
        'b-stream'
    }>
      <h3 className='b-stream__header'>
        {header}
      </h3>
      <SelectField 
        label='Кодек:'
        selectedValue={stream.codec}
        values={CodecTypes}
        onChange={changeCodec}          
      />
      <SelectField 
        label='Разрешение:'
        selectedValue={stream.resolution}
        values={resolutionTypes}
        onChange={changeResolution}          
      />
      <SelectField 
        label='Тип битрейта:'
        className='b-stream__bitrate-type'
        selectedValue={stream.bitrateType}
        values={BitrateTypes}
        onChange={changeBitrateType}          
      />
      <Slider
        header='Битрейт:'
        value={bitrate}
        min={512}
        max={3072}
        step={1}
        marks={false}
        onBlur={() => changeBitrate(bitrate)}
        onChange={(e, value) => handleBitrateChange(e, value.toString())}
      />
      <Slider
        header='Частота кадров:'
        value={framerate}
        min={5}
        max={30}
        step={1}
        onBlur={() => changeFramerate(framerate)}
        onChange={(e, value) => handleFramerateChange(e, value.toString())}
      />
      <Slider
        header='Интервал группы кадров:'
        className='b-stream__gop-interval'
        value={gopInterval}
        min={1}
        max={200}
        step={1}
        marks={false}
        onBlur={() => changeGopInterval(gopInterval)}
        onChange={(e, value) => handleGopIntervalChange(e, value.toString())}
      />
      <h4>Параметры квантования</h4>
      <RadioButton 
        label='Настроить автоматически'
        value={stream.qpAuto}
        onChange={changeQpAuto}
      /> 
      {
        !stream.qpAuto
        &&
          <>
            <Slider
              header='Мин:'
              value={qpMin}
              min={0}
              max={51}
              step={1}
              marks={false}
              onBlur={() => changeQpMin(qpMin)}
              onChange={(e, value) => handleQpMinChange(e, value.toString())}
            />
            <Slider
              header='Макс:'
              value={qpMax}
              min={0}
              max={51}
              step={1}
              marks={false}
              onBlur={() => changeQpMax(qpMax)}
              onChange={(e, value) => handleQpMaxChange(e, value.toString())}
            />
          </>
      }
      <Divider />
    </div>
  )
}

export default CameraSettings
