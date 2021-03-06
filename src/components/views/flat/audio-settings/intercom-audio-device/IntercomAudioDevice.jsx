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
      trigger="?????????????????? ?????????? ????????????????"
    >
      <div className='b-flat__audio-setting'>        
        <RadioButton 
          label='???????????????????????????? ?????????????????? ??????????????????'
          className='b-flat__audio-setting-radio'
          value={intercomAudioDevice.microphone.agcMode}
          onChange={handleMicrophoneAgcModeChange}
        /> 
        <div className='b-flat__audio-settings-microphone'>
          <h4 className='b-flat__audio-setting-header'>
            ????????????????
          </h4>       
          {
            !intercomAudioDevice.microphone.agcMode
            &&
              <Slider
                header='????????????????????????????????:'
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
        <h4 className='b-flat__audio-setting-header'>
          ??????????????
        </h4>
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
