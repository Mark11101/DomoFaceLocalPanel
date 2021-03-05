import rehydrateAuth from './Auth'
import rehydrateUi from './Ui'
import rehydrateIntercom from './Intercom'
import rehydrateFlat from './Flat'
import rehydrateKeys from './Keys'
import rehydrateFaces from './Faces'
import rehydrateUsers from './Users'
import rehydrateCamera from './Camera'

const rehydrate = (state) => {
  if (!state) {
    return state
  }

  return {
    ...state,
    auth: rehydrateAuth({ ...state.auth }),
    ui: rehydrateUi({ ...state.ui }),
    intercom: rehydrateIntercom({ ...state.intercom }),
    flat: rehydrateFlat({ ...state.flat }),
    keys: rehydrateKeys({ ...state.keys }),
    faces: rehydrateFaces({ ...state.faces }),
    users: rehydrateUsers({ ...state.users }),
    camera: rehydrateCamera({ ...state.camera }),
  }
}

export default rehydrate
