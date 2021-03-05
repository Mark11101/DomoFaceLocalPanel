import { initialState as AuthInitialState } from '../reducers/Auth'
import { initialState as UiInitialState } from '../reducers/Ui'
import IntercomInitialState from '../reducers/intercom/Intercom'
import FlatInitialState from '../reducers/flat/Flat'
import { initialState as KeysInitialState } from '../reducers/Keys'
import { initialState as FacesInitialState } from '../reducers/Faces'
import { initialState as UsersInitialState } from '../reducers/Users'
import { initialState as CameraInitialState } from '../reducers/Camera'

export const initialState = {
  auth: AuthInitialState,
  ui: UiInitialState,
  intercom: IntercomInitialState,
  flat: FlatInitialState,
  keys: KeysInitialState,
  faces: FacesInitialState,
  users: UsersInitialState,
  camera: CameraInitialState,
}
