import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Collapsible from 'react-collapsible'
import moment from 'moment'
import { Link } from 'react-router-dom'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import MainSettings from './main-settings/MainSettingsContainer'
import FlatsCredential from './sip-settings/flats-credential/FlatsCredentialContainer'
import EmergencyCredential from './sip-settings/emergency-credential/EmergencyCredentialContainer'
import StunServers from './sip-settings/stun-servers/StunServersContainer'
import EmergencySipAccounts from './sip-settings/emergency-sip-accounts/EmergencySipAccountsContainer'
import IntercomAudioDevice from './audio-settings/intercom-audio-device/IntercomAudioDeviceContainer'
import FlatAudioDevice from './audio-settings/flat-audio-device/FlatAudioDeviceContainer'
import SipAudioDevice from './audio-settings/sip-audio-device/SipAudioDeviceContainer'
import Divider from '../../subcomponents/divider/Divider'
import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'
import convertTimeZone from '../../../utils/string/convertTimeZone'
import { showErrorMessage } from '../../../utils/notifications/messages'
import PhotoFromCamera from '../../../images/invalid-camera.png'
import CameraSettings from '../../views/intercom/camera-settings/CameraSettingsContainer'
import SysSettings from './sys-settings/SysSettingsContainer'

import './Intercom.css'

const Intercom = (props) => {
  const {
    intercomSettings,
    camera,
    requestIntercomInfo,
    requestCameraRtsp,
    requestCameraSnapshot,
    requestIntercomSettings,
    requestOpenDoor,
    requestResetSetiings,
    requestUpdateIntercomSettings,
    requestRebootIntercom,
    requestDownloadSettings,
    requestLoadSettings,
    requestUpdateFirmware,
  } = props;

  const intercomInfo   = intercomSettings.intercomInfo;
  const timeSettings   = intercomSettings.mainSettings.timeSettings;
  const audioSettings  = intercomSettings.audioSettings;
  const cameraSettings = intercomSettings.cameraSettings;

  const intercomAudioDevice = audioSettings.intercomAudioDevice;
  const flatAudioDevice     = audioSettings.flatAudioDevice;
  const sipAudioDevice      = audioSettings.sipAudioDevice;

  const dateTime = timeSettings.datetime;

  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  React.useEffect(() => {

    requestIntercomInfo()
    requestCameraRtsp()
    requestCameraSnapshot()
    requestIntercomSettings()
  }, [
    requestIntercomInfo, 
    requestCameraRtsp, 
    requestIntercomSettings,
    requestCameraSnapshot
  ])

  const copyText = (text) => {
    const el = document.createElement('textarea');
    
    el.value = text;
    
    document.body.appendChild(el);
    
    el.select();

    document.execCommand('copy');
    document.body.removeChild(el);
  }

  const handleCopyMainStream = () => {
    
    const mainStream = document.getElementById("main-stream-link");
    copyText(mainStream.innerHTML)
  }

  const handleCopySubStream = () => {
    
    const subStream = document.getElementById("sub-stream-link");
    copyText(subStream.innerHTML)
  }

  const handleOpenDoor = () => {

    requestOpenDoor()
  }

  const handleDownloadSettings = () => {

    requestDownloadSettings()
  }

  const handleLoadSettings = (event) => {
    const file = event.target.files[0];

    if (file && file.name.split('.').pop() !== 'dump') {

      showErrorMessage('Выберите файл формата .dump')
    } else if (file.size > 32000000) {

      showErrorMessage('Размер файла не должен превышать 32MB')
    } else {

      let formData = new FormData();
      formData.append('dump', file);
      
      requestLoadSettings(formData)
    }
  }

  const handleResetSettings = () => {

    requestResetSetiings()
    setIsModalDeleteVisible(false)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true);
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false);
  }

  const handleRebootIntercom = () => {

    requestRebootIntercom()
  }

  const handleUpdateFirmware = (event) => {
    const file = event.target.files[0];

    if (file && file.name.split('.').pop() !== 'bin') {

      showErrorMessage('Выберите файл формата .bin')

    } else if (file.size > 64000000) {

      showErrorMessage('Размер файла не должен превышать 64MB')
    
    } else {

      let formData = new FormData();
      formData.append('firmware', file);
  
      requestUpdateFirmware(formData)
    }
  }

  const handleSettingsLoadBtnClick = () => {

    document.getElementById('settings-upload').click()
  }

  const handleFirmwareLoadBtnClick = () => {

    document.getElementById('firmware-upload').click()
  }

  const handleSaveSettings = () => {

    const mainSettings = intercomSettings.mainSettings;
    const timeSettings = mainSettings.timeSettings;
    const flatsSettings = intercomSettings.mainSettings.flatsSettings;
    const durationSettings = intercomSettings.mainSettings.durationSettings;
    const mainStreamCamera = cameraSettings.stream.main;
    const subStreamCamera = cameraSettings.stream.sub;
    const imageCamera = cameraSettings.image;

    requestUpdateIntercomSettings({
      timeSettings: timeSettings,
      commutatorType: mainSettings.commutatorType,
      collectKeysMode: mainSettings.collectKeysMode,
      faceRecognitionThreshold: Number(mainSettings.faceRecognitionThreshold),
      flatsSettings: {
        firstNumber: Number(flatsSettings.firstNumber),
        lastNumber: Number(flatsSettings.lastNumber),
        lineThresholds: {
          min: Number(flatsSettings.lineThresholds.min),
          max: Number(flatsSettings.lineThresholds.max),
        }
      },
      durationSettings: {
        ring: Number(durationSettings.ring),
        call: Number(durationSettings.call),
        doorOpen: Number(durationSettings.doorOpen),
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
            sfxGain: Number(intercomAudioDevice.speaker.sfxGain),
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
            sfxGain: Number(sipAudioDevice.speaker.sfxGain),
            intercomGain: Number(sipAudioDevice.speaker.intercomGain),
          }
        },
      },
      cameraSettings: {
        stream: {
          main: {
            codec: mainStreamCamera.codec,
            resolution: mainStreamCamera.resolution,
            framerate: Number(mainStreamCamera.framerate),
            bitrateType: mainStreamCamera.bitrateType,
            bitrate: Number(mainStreamCamera.bitrate),
            gopInterval: Number(mainStreamCamera.gopInterval),
            qpAuto: mainStreamCamera.qpAuto,
            qpMin: Number(mainStreamCamera.qpMin),
            qpMax: Number(mainStreamCamera.qpMax),
          },
          sub: {
            codec: subStreamCamera.codec,
            resolution: subStreamCamera.resolution,
            framerate: Number(subStreamCamera.framerate),
            bitrateType: subStreamCamera.bitrateType,
            bitrate: Number(subStreamCamera.bitrate),
            gopInterval: Number(subStreamCamera.gopInterval),
            qpAuto: subStreamCamera.qpAuto,
            qpMin: Number(subStreamCamera.qpMin),
            qpMax: Number(subStreamCamera.qpMax),
          },
          profile: cameraSettings.stream.profile,
        },
        image: {
          flipHorizontal: imageCamera.flipHorizontal,
          flipVertical: imageCamera.flipVertical,
          frequency: imageCamera.frequency,
          brightness: Number(imageCamera.brightness),
          contrast: Number(imageCamera.contrast),
          saturation: Number(imageCamera.saturation),
          sharpness: Number(imageCamera.sharpness),
          wbAuto: imageCamera.wbAuto,
          wbManualRed: Number(imageCamera.wbManualRed),
          wbManualGreen: Number(imageCamera.wbManualGreen),
          wbManualBlue: Number(imageCamera.wbManualBlue),
          blc: Number(imageCamera.blc),
          hlc: Number(imageCamera.hlc),
          dnr2d: Number(imageCamera.dnr2d),
          dnr3d: Number(imageCamera.dnr3d),
          antiFlicker: imageCamera.antiFlicker,
          defogging: Number(imageCamera.defogging),
          wdr: Number(imageCamera.wdr),
          irAuto: imageCamera.irAuto,
          irColored: imageCamera.irColored,
        },
        password: cameraSettings.password,
      },
      syslogSettings: intercomSettings.sysSettings
    })
  }
  
  return (
    <>
      <Container className='b-intercom'>
        <h1 className='b-intercom__title'>
          Домофон
        </h1>
        <Divider />
        <img 
          src={camera.snapshot || PhotoFromCamera}
          alt=''
          className='b-intercom__photo-from-camera'
        />
        <Divider />
        <div className='b-intercom__intercom-info'>
          <p>
            <span>
              ID устройства:
            </span>
            <span>
              {intercomInfo.deviceId || '-'}
            </span>
          </p>
          <p>
            <span>
              Версия аппаратного обеспечения:
            </span>
            <span>
              {intercomInfo.hardwareVersion || '-'}
            </span>
          </p>
          <p>
            <span>
              Версия программного обеспечения:
            </span>
            <span>
              {intercomInfo.softwareVersion || '-'}
            </span>
          </p>
          <p>
            <span>
              Температура:
            </span>
            <span>
              {
                intercomInfo.cpuTemp
                ?
                  intercomInfo.cpuTemp.toFixed(1) + '℃' 
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>
              Дата и время:
            </span>
            <span>
              {dateTime ? moment(convertTimeZone(dateTime)).format('DD/MM/YYYY HH:mm') : '-'}
            </span>
          </p>
          <p>
            <span>
              Основной поток:
            </span>
            {
              camera.mainStream
              &&
                <button
                  className='b-button b-intercom__copy-btn'
                  onClick={handleCopyMainStream}
                >
                  <FileCopyIcon />
                </button>
            }
            <span id='main-stream-link'>
              {camera.mainStream || '-'}
            </span>
          </p>
          <p>
            <span>
              Дополнительный поток:
            </span>
            {
              camera.subStream
              &&
                <button
                  className='b-button b-intercom__copy-btn'
                  onClick={handleCopySubStream}
                >
                  <FileCopyIcon />
                </button>
            }
            <span id='sub-stream-link'>
              {camera.subStream || '-'}
            </span>
          </p>
        </div>
        <Divider />
        <button
          className='b-button b-intercom__open-door-btn'
          onClick={handleOpenDoor}
        >
          Открыть дверь
        </button>
        <button
          className='b-button b-intercom__open-door-btn'
          onClick={handleRebootIntercom}
        >
          Перезагрузить
        </button>
        <button
          className='b-button b-intercom__update-firmware-btn'
          onClick={handleFirmwareLoadBtnClick}
        >
          <input
            id='firmware-upload'
            className='b-keys__load-input'
            type='file'
            onChange={handleUpdateFirmware}
            hidden
          />
          Обновить прошивку
        </button>
        <Link
          className='b-button b-intercom__open-docs-btn'
          to='/redoc'
          target="_blank"
        >
          Посмотреть документацию
        </Link>
        <button
          className='b-button b-intercom__download-settings'
          onClick={handleDownloadSettings}
        >
          Скачать файл настроек
        </button>
        <button
          className='b-button b-intercom__load-settings'
          onClick={handleSettingsLoadBtnClick}
        >
          <input
            id='settings-upload'
            className='b-keys__load-input'
            type='file'
            onChange={handleLoadSettings}
            hidden
          />
          Загрузить файл настроек
        </button>
        <button
          className='b-button b-intercom__reset-settings-btn'
          onClick={handleOpenModalDelete}
        >
          Сбросить все настройки
        </button>
        <div className='b-intercom__form'>
          <Collapsible 
            trigger="Основные настройки"
            className='b-main-settings'
            openedClassName='b-main-settings'
          >
            <MainSettings 
              mainSettings={intercomSettings.mainSettings} 
              syslogSettings={intercomSettings.sysSettings}
            />
          </Collapsible>
          <Collapsible 
            trigger="Настройки звука"
            className='b-audio-settings'
            openedClassName='b-audio-settings'
          >
            <IntercomAudioDevice intercomAudioDevice={intercomAudioDevice} />
            <FlatAudioDevice flatAudioDevice={flatAudioDevice} />
            <SipAudioDevice sipAudioDevice={sipAudioDevice} />
          </Collapsible>
          <Collapsible 
            trigger="Настройки камеры"
            className='b-camera-settings'
            openedClassName='b-camera-settings'
          >
            <CameraSettings cameraSettings={intercomSettings.cameraSettings} />
          </Collapsible>
          <Collapsible
            trigger="Syslog настройки"
            className='b-intercom__sys-settings'
            openedClassName='b-intercom__sys-settings'
          >
            <SysSettings sysSettings={intercomSettings.sysSettings} />
          </Collapsible>
          <div className='b-intercom__control-btns'>
            <button
              className='b-button b-intercom__save-settings-btn'
              onClick={handleSaveSettings}
            >
              Сохранить
            </button>
          </div>
          <Collapsible
            trigger="Настройки SIP авторизации"
            className='b-intercom__sip-settings'
            openedClassName='b-intercom__sip-settings'
          >
            <FlatsCredential />
            <EmergencyCredential />
            <StunServers />
            <EmergencySipAccounts />
          </Collapsible>
        </div>
      </Container>
      <ModalDelete
        show={isModalDeleteVisible}
        handleCloseModal={handleCloseModalDelete}
        handleDeleteAll={handleResetSettings}
        header='Вы уверены, что хотите сбросить настройки?'
      />
    </>
  )
}

export default Intercom
