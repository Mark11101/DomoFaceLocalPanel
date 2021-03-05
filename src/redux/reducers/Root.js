import { combineReducers } from 'redux'

import Auth from './Auth'
import Ui from './Ui'
import Intercom from './intercom/Intercom'
import Flat from './flat/Flat'
import Keys from './Keys'
import Faces from './Faces'
import Users from './Users'
import Camera from './Camera'

const RootReducer = combineReducers({
  auth: Auth,
  intercom: Intercom,
  flat: Flat,
  keys: Keys,
  ui: Ui,
  faces: Faces,
  users: Users,
  camera: Camera,
})

export default RootReducer
