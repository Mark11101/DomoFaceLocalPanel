import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import Slider from '../../../../subcomponents/slider/Slider'

import './IntercomAudioDevice.css'

const IntercomAudioDevice = (props) => {
  const {
    intercomAudioDevice,
    changeMicrophoneGain,
    changeMicrophoneAgcMode,
    changeMicrophoneAgcModeMaxGain,
    changeMicrophoneAgcModeTargetLevel,
    changeSpeakerSfxGain,
    changeSpeakerFlatGain,
    changeSpeakerSipGain,
  } = props;

  const microphone = intercomAudioDevice.microphone;
  const speaker    = intercomAudioDevice.speaker;

  const [gain, setGain]                             = useState('');
  const [agcModeMaxGain, setAgcModeMaxGain]         = useState('');
  const [agcModeTargetLevel, setAgcModeTargetLevel] = useState('');
  const [sfxGain, setSfxGain]                       = useState('');
  const [flatGain, setFlatGain]                     = useState('');
  const [sipGain, setSipGain]                       = useState('');

  const [isOneOfValuesChanged, setIsOneOfValuesChanged] = useState(false);
  
  React.useEffect(() => {

    if (!isOneOfValuesChanged) {
            
      setGain(microphone.gain)
      setAgcModeMaxGain(microphone.agcModeMaxGain)
      setAgcModeTargetLevel(microphone.agcModeTargetLevel)
      setSfxGain(speaker.sfxGain)
      setFlatGain(speaker.flatGain)
      setSipGain(speaker.sipGain)
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

  const handleSpeakerFlatGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setFlatGain(value)
  }

  const handleSpeakerFlatGainBlur = () => {
    
    changeSpeakerFlatGain(flatGain)
  }

  const handleSpeakerSipGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setSipGain(value)
  }

  const handleSpeakerSipGainBlur = () => {
    
    changeSpeakerSipGain(sipGain)
  }

  return (
    <Collapsible 
      trigger="?????????????????? ?????????? ????????????????"
      className='b-collapsible__inner-list'
      openedClassName='b-collapsible__inner-list'
    >
      <div className='b-intercom__audio-setting'> 
        <RadioButton 
          label='???????????????????????????? ?????????????????? ??????????????????'
          className='b-intercom__audio-setting-radio'
          name='agcMode'
          value={microphone.agcMode}
          onChange={handleMicrophoneAgcModeChange}
        /> 
        <div className='b-intercom__microphone-container'>
          <h4 className='b-intercom__audio-setting-header'>
            ????????????????
          </h4>
          {
            !microphone.agcMode
            &&
              <Slider
                header='????????????????????????????????:'
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
                  header='???????????????????????? ????????????????????????????????:'
                  value={agcModeMaxGain}
                  onBlur={handleMicrophoneAgcModeMaxGainBlur}
                  onChange={(e, value) => handleMicrophoneAgcModeMaxGainChange(e, value.toString())}
                />
                <Slider
                  header='?????????????????? ?????????????? ????????????????????????????????:'
                  value={agcModeTargetLevel}
                  step={8}
                  onBlur={handleMicrophoneAgcModeTargetLevelBlur}
                  onChange={(e, value) => handleMicrophoneAgcModeTargetLevelChange(e, value.toString())}
                />
              </>
          } 
        </div>
        <h4 className='b-intercom__audio-setting-header'>
          ??????????????
        </h4>
        <Slider
          header='?????????????????? ?????????????????? ????????????:'
          value={sfxGain}
          onBlur={handleSpeakerSfxGainBlur}
          onChange={(e, value) => handleSpeakerSfxGainChange(e, value.toString())}
        />
        <Slider
          header='?????????????????? ????????????:'
          value={flatGain}
          onBlur={handleSpeakerFlatGainBlur}
          onChange={(e, value) => handleSpeakerFlatGainChange(e, value.toString())}
        />
        <Slider
          header='?????????????????? SIP:'
          value={sipGain}
          onBlur={handleSpeakerSipGainBlur}
          onChange={(e, value) => handleSpeakerSipGainChange(e, value.toString())}
        />
      </div>
    </Collapsible>
  )
}

export default IntercomAudioDevice
