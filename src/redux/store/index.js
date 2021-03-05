import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import rootReducer from '../reducers/Root'
import { epicMiddleware, rootEpic } from '../epics'
import * as localStorage from './localStorage'
import rehydrate from '../rehydrate'
import { initialState } from './initialState'

const persistedState = rehydrate(localStorage.loadState(initialState))

export const store = createStore(rootReducer, persistedState, composeWithDevTools(
  applyMiddleware(epicMiddleware),
))

store.subscribe(throttle(() => {
  const state = store.getState()

  localStorage.saveState(
    {
      auth: {
        isLogged: state.auth.isLogged,
        login: state.auth.login,
        password: state.auth.password,
        intercomHealth: state.auth.intercomHealth,
      },
      users: {
        currentUser: {
          role: state.users.currentUser.role,
        }
      },
      // faces: state.faces,
    },
  )
}, 1000))


epicMiddleware.run(rootEpic)

store.dispatch({ 
  type: 'APP_INIT' 
})
