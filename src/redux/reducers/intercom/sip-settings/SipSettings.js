import { combineReducers } from 'redux'

import FlatsCredential from './flats-credential/FlatsCredential'
import EmergencyCredential from './emergency-credential/EmergencyCredential'
import StunServers from './stun-servers/StunServers'
import EmergencySipAccounts from './emergency-sip-accounts/EmergencySipAccounts'

const SipSettingsReducer = combineReducers({
  flatsCredential:     FlatsCredential,
  emergencyCredential: EmergencyCredential,
  stunServers:          StunServers,
  emergencySipAccounts: EmergencySipAccounts,
})

export default SipSettingsReducer
