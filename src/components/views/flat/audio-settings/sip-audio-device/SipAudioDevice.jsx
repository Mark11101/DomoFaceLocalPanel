import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import RadioButton from '../../../../subcomponents/radio-button/RadioButton'
import Slider from '../../../../subcomponents/slider/Slider'

import './SipAudioDevice.css'

const SipAudioDevice = (props) => {
  const {
    sipAudioDevice,
    changeGain,
    changeAgcMode,
    changeAgcModeMaxGain,
    changeAgcModeTargetLevel,
    changeIntercomGain,
  } = props;

  const microphone = sipAudioDevice.microphone;
  const speaker    = sipAudioDevice.speaker;

  const [gain, setGain]                             = useState('');
  const [agcModeMaxGain, setAgcModeMaxGain]         = useState('');
  const [agcModeTargetLevel, setAgcModeTargetLevel] = useState('');
  const [intercomGain, setIntercomGain]             = useState('');

  const [isOneOfValuesChanged, setIsOneOfValuesChanged] = useState(false);
  
  React.useEffect(() => {

    if (!isOneOfValuesChanged) {

      setGain(microphone.gain)
      setAgcModeMaxGain(microphone.agcModeMaxGain)
      setAgcModeTargetLevel(microphone.agcModeTargetLevel)
      setIntercomGain(speaker.intercomGain)
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

  const handleSpeakerIntercomGainChange = (event, value) => {

    setIsOneOfValuesChanged(true)
    setIntercomGain(value)
  }

  const handleSpeakerIntercomGainBlur = () => {
    
    changeIntercomGain(intercomGain)
  }

  return (
    <Collapsible 
      className='b-collapsible__inner-list'
      openedClassName='b-collapsible__inner-list'
      trigger="?????????????????? SIP ??????????"
    >
      <div className='b-flat__audio-setting'>
        <RadioButton 
          label='???????????????????????????? ?????????????????? ??????????????????'
          className='b-flat__audio-setting-radio'
          value={sipAudioDevice.microphone.agcMode}
          onChange={handleMicrophoneAgcModeChange}
        /> 
        <div className='b-flat__audio-settings-microphone'>
          <h4 className='b-flat__audio-setting-header'>
            ????????????????
          </h4>
          {
            !sipAudioDevice.microphone.agcMode
            &&
              <Slider
                header='????????????????????????????????:'
                value={gain}
                onBlur={handleMicrophoneGainBlur}
                onChange={(e, value) => handleMicrophoneGainChange(e, value.toString())}
              />
          }
          {
            sipAudioDevice.microphone.agcMode
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
          header='?????????????????? ????????????????:'
          value={intercomGain}
          onBlur={handleSpeakerIntercomGainBlur}
          onChange={(e, value) => handleSpeakerIntercomGainChange(e, value.toString())}
        />
      </div>
    </Collapsible>
  )
}

export default SipAudioDevice
