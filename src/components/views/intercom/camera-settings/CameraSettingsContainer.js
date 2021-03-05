import { connect } from 'react-redux'

import {
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
} from '../../../../redux/actions/intercom/camera-settings/CameraSettings'

import {
  requestEnableIrCut,
  requestDisableIrCut,
} from '../../../../redux/actions/Camera'

import CameraSettings from './CameraSettings'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    changeMainCodec: (codec) => dispatch(changeMainCodec(codec)),
    changeMainResolution: (resolution) => dispatch(changeMainResolution(resolution)),
    changeMainFramerate: (framerate) => dispatch(changeMainFramerate(framerate)),
    changeMainBitrateType: (bitrateType) => dispatch(changeMainBitrateType(bitrateType)),
    changeMainBitrate: (bitrate) => dispatch(changeMainBitrate(bitrate)),
    changeMainGopInterval: (gopInterval) => dispatch(changeMainGopInterval(gopInterval)),
    changeMainQpAuto: () => dispatch(changeMainQpAuto()),
    changeMainQpMin: (qpMin) => dispatch(changeMainQpMin(qpMin)),
    changeMainQpMax: (qpMax) => dispatch(changeMainQpMax(qpMax)),
    changeSubCodec: (codec) => dispatch(changeSubCodec(codec)),
    changeSubResolution: (resolution) => dispatch(changeSubResolution(resolution)),
    changeSubFramerate: (framerate) => dispatch(changeSubFramerate(framerate)),
    changeSubBitrateType: (bitrateType) => dispatch(changeSubBitrateType(bitrateType)),
    changeSubBitrate: (bitrate) => dispatch(changeSubBitrate(bitrate)),
    changeSubGopInterval: (gopInterval) => dispatch(changeSubGopInterval(gopInterval)),
    changeSubQpAuto: () => dispatch(changeSubQpAuto()),
    changeSubQpMin: (qpMin) => dispatch(changeSubQpMin(qpMin)),
    changeSubQpMax: (qpMax) => dispatch(changeSubQpMax(qpMax)),
    changeProfile: (profile) => dispatch(changeProfile(profile)),
    changeFlipHorizontal: () => dispatch(changeFlipHorizontal()),
    changeFlipVertical: () => dispatch(changeFlipVertical()),
    changeFrequency: (frequency) => dispatch(changeFrequency(frequency)),
    changeBrightness: (brightness) => dispatch(changeBrightness(brightness)),
    changeContrast: (contrast) => dispatch(changeContrast(contrast)),
    changeSaturation: (saturation) => dispatch(changeSaturation(saturation)),
    changeSharpness: (sharpness) => dispatch(changeSharpness(sharpness)),
    changeWbAuto: () => dispatch(changeWbAuto()),
    changeWbManualRed: (wbManualRed) => dispatch(changeWbManualRed(wbManualRed)),
    changeWbManualGreen: (wbManualGreen) => dispatch(changeWbManualGreen(wbManualGreen)),
    changeWbManualBlue: (wbManualBlue) => dispatch(changeWbManualBlue(wbManualBlue)),
    changeBlc: (blc) => dispatch(changeBlc(blc)),
    changeHlc: (hlc) => dispatch(changeHlc(hlc)),
    changeDnr2d: (dnr2d) => dispatch(changeDnr2d(dnr2d)),
    changeDnr3d: (dnr3d) => dispatch(changeDnr3d(dnr3d)),
    changeDefogging: (defogging) => dispatch(changeDefogging(defogging)),
    changeWdr: (wdr) => dispatch(changeWdr(wdr)),
    changeAntiFlicker: () => dispatch(changeAntiFlicker()),
    changeIrAuto: () => dispatch(changeIrAuto()),
    changeIrColored: () => dispatch(changeIrColored()),
    changeCameraPassword: (password) => dispatch(changeCameraPassword(password)),
    requestEnableIrCut: () => dispatch(requestEnableIrCut()),
    requestDisableIrCut: () => dispatch(requestDisableIrCut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraSettings)
