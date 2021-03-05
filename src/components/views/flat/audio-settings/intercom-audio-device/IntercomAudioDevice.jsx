import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import Slider from '../../../../subcomponents/slider/Slider'

import './IntercomAudioDevice.css'

const IntercomAudioDevice = (props) => {
  const {
    intercomAudioDevice,
    changeGain,
    changeAgcMode,
    changeAgcModeMaxGain,
    changeAgcModeTargetLevel,
    changeFlatGain,
    changeSipGain,
  } = props;

  const microphone = intercomAudioDevice.microphone;
  const speaker    = intercomAudioDevice.speaker;

  const [gain, setGain]                             = useState('');
  const [agcModeMaxGain, setAgcModeMaxGain]         = useState('');
  const [agcModeTargetLevel, setAgcModeTargetLevel] = useState('');
  const [flatGain, setFlatGain]                     = useState('');
  const [sipGain, setSipGain]                       = useState('');

  const [isOneOfValuesChanged, setIsOneOfValuesChanged] = useState(false);
  
  React.useEffect(() => {

    if (!isOneOfValuesChanged) {

      setGain(microphone.gain)
      setAgcModeMaxGain(microphone.agcModeMaxGain)
      setAgcModeTargetLevel(microphone.agcModeTargetLevel)
      setFlatGain(speaker.flatGain)
      setSipGain(speaker.sipGain)
    }
  }, [isOneOfValuesChanged, microphone, speaker])

  const handleMicrophoneGainChange = (event, value) => {
    
    setIsOneOfValuesChanged(true)
    setGain(value)
  }
  
  const handleMicrophoneGainBlur = () => {
    
    changeGain(gain)
  }

  const handleMicrophoneAgcModeChange = () => {

    changeAgcMode()
  }

  const handleMicrophoneAgcModeMaxGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setAgcModeMaxGain(value)
  }

  const handleMicrophoneAgcModeMaxGainBlur = () => {
    
    changeAgcModeMaxGain(agcModeMaxGain)
  }

  const handleMicrophoneAgcModeTargetLevelChange = (event, value) => {
    
    setIsOneOfValuesChanged(true)
    setAgcModeTargetLevel(value)
  }

  const handleMicrophoneAgcModeTargetLevelBlur = () => {
    
    changeAgcModeTargetLevel(agcModeTargetLevel)
  }

  const handleSpeakerFlatGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setFlatGain(value)
  }

  const handleSpeakerFlatGainBlur = () => {
    
    changeFlatGain(flatGain)
  }

  const handleSpeakerSipGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setSipGain(value)
  }

  const handleSpeakerSipGainBlur = () => {
    
    changeSipGain(sipGain)
  }

  return (
    <Collapsible 
      className='b-collapsible__inner-list'
      openedClassName='b-collapsible__inner-list'
      trigger="Настройки звука домофона"
    >
      <div className='b-flat__audio-setting'>        
        <RadioButton 
          label='Автоматическая настройка микрофона'
          className='b-flat__audio-setting-radio'
          value={intercomAudioDevice.microphone.agcMode}
          onChange={handleMicrophoneAgcModeChange}
        /> 
        <div className='b-flat__audio-settings-microphone'>
          <h4 className='b-flat__audio-setting-header'>
            Микрофон
          </h4>       
          {
            !intercomAudioDevice.microphone.agcMode
            &&
              <Slider
                header='Чувствительность:'
                value={gain}
                onBlur={handleMicrophoneGainBlur}
                onChange={(e, value) => handleMicrophoneGainChange(e, value.toString())}
              />
          }
          {
            intercomAudioDevice.microphone.agcMode
            &&
              <>
                <Slider
                  header='Максимальная чувствительность:'
                  value={agcModeMaxGain}
                  onBlur={handleMicrophoneAgcModeMaxGainBlur}
                  onChange={(e, value) => handleMicrophoneAgcModeMaxGainChange(e, value.toString())}
                />
                <Slider
                  header='Требуемый уровень чувствительности:'
                  value={agcModeTargetLevel}
                  step={8}
                  onBlur={handleMicrophoneAgcModeTargetLevelBlur}
                  onChange={(e, value) => handleMicrophoneAgcModeTargetLevelChange(e, value.toString())}
                />
              </>
          }
        </div>
        <h4 className='b-flat__audio-setting-header'>
          Динамик
        </h4>
        <Slider
          header='Громкость звонка:'
          value={flatGain}
          onBlur={handleSpeakerFlatGainBlur}
          onChange={(e, value) => handleSpeakerFlatGainChange(e, value.toString())}
        />
        <Slider
          header='Громкость SIP:'
          value={sipGain}
          onBlur={handleSpeakerSipGainBlur}
          onChange={(e, value) => handleSpeakerSipGainChange(e, value.toString())}
        />
      </div>
    </Collapsible>
  )
}

export default IntercomAudioDevice
