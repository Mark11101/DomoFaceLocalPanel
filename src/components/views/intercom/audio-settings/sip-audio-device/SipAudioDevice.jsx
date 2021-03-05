import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import Slider from '../../../../subcomponents/slider/Slider'

import './SipAudioDevice'

const SipAudioDevice = (props) => {
  const {
    sipAudioDevice,
    changeMicrophoneGain,
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain,
    changeMicrophoneAgcModeTargetLevel,
    changeSpeakerSfxGain,
    changeSpeakerIntercomGain,
  } = props;

  const microphone = sipAudioDevice.microphone;
  const speaker    = sipAudioDevice.speaker;

  const [gain, setGain]                             = useState('');
  const [agcModeMaxGain, setAgcModeMaxGain]         = useState('');
  const [agcModeTargetLevel, setAgcModeTargetLevel] = useState('');
  const [sfxGain, setSfxGain]                       = useState('');
  const [intercomGain, setIntercomGain]             = useState('');

  const [isOneOfValuesChanged, setIsOneOfValuesChanged] = useState(false);
  
  React.useEffect(() => {

    if (!isOneOfValuesChanged) {
      
      setGain(microphone.gain)
      setAgcModeMaxGain(microphone.agcModeMaxGain)
      setAgcModeTargetLevel(microphone.agcModeTargetLevel)
      setSfxGain(speaker.sfxGain)
      setIntercomGain(speaker.intercomGain)
    }
  }, [isOneOfValuesChanged, microphone, speaker])

  const handleMicrophoneGainChange = (event, value) => {
    
    setIsOneOfValuesChanged(true)
    setGain(value)
  }

  const handleMicrophoneGainBlur = () => {

    changeMicrophoneGain(gain)
  }

  const handleMicrophoneAgcModeChange = () => {

    changeMicrophoneAgcMode()
  }

  const handleMicrophoneAgcModeMaxGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setAgcModeMaxGain(value)
  }

  const handleMicrophoneAgcModeMaxGainBlur = () => {
    
    changeMicrophoneAgcModeMaxGain(agcModeMaxGain)
  }

  const handleMicrophoneAgcModeTargetLevelChange = (event, value) => {
    
    setIsOneOfValuesChanged(true)
    setAgcModeTargetLevel(value)
  }

  const handleMicrophoneAgcModeTargetLevelBlur = () => {
    
    changeMicrophoneAgcModeTargetLevel(agcModeTargetLevel)
  }

  const handleSpeakerSfxGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setSfxGain(value)
  }

  const handleSpeakerSfxGainBlur = () => {
    
    changeSpeakerSfxGain(sfxGain)
  }

  const handleSpeakerIntercomGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setIntercomGain(value)
  }

  const handleSpeakerIntercomGainBlur = () => {
    
    changeSpeakerIntercomGain(intercomGain)
  }

  return (
    <Collapsible 
      trigger="Настройки SIP звука"
      className='b-collapsible__inner-list'
      openedClassName='b-collapsible__inner-list'
    >
      <div className='b-intercom__audio-setting'> 
        <RadioButton 
          label='Автоматическая настройка микрофона'
          className='b-intercom__audio-setting-radio'
          name='agcMode'
          value={microphone.agcMode}
          onChange={handleMicrophoneAgcModeChange}
        /> 
        <div className="b-intercom__microphone-container">
          <h4 className='b-intercom__audio-setting-header'>
            Микрофон
          </h4>
          {
            !microphone.agcMode
            &&
              <Slider
                header='Чувствительность:'
                value={gain}
                onBlur={handleMicrophoneGainBlur}
                onChange={(e, value) => handleMicrophoneGainChange(e, value.toString())}
              />
          }
          {
            microphone.agcMode
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
        <h4 className='b-intercom__audio-setting-header'>
          Динамик
        </h4>
        <Slider
          header='Громкость системных звуков:'
          value={sfxGain}
          onBlur={handleSpeakerSfxGainBlur}
          onChange={(e, value) => handleSpeakerSfxGainChange(e, value.toString())}
        />
        <Slider
          header='Громкость домофона:'
          value={intercomGain}
          onBlur={handleSpeakerIntercomGainBlur}
          onChange={(e, value) => handleSpeakerIntercomGainChange(e, value.toString())}
        />
      </div>
    </Collapsible>
  )
}

export default SipAudioDevice
