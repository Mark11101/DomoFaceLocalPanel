import { combineReducers } from 'redux'

import MainSettingsReducer from './main-settings/MainSettings'
import AudioSettingsReducer from './audio-settings/AudioSettings'
import ResetSettingsReducer from './ResetFlatSettings'
import FlatSipAccountsReducer from './flat-sip-accounts/FlatSipAccounts'

const FlatReducer = combineReducers({
  mainSettings:  MainSettingsReducer,
  audioSettings: AudioSettingsReducer,
  resetSettings: ResetSettingsReducer,
  flatSipAccounts: FlatSipAccountsReducer,
})

export default FlatReducer
