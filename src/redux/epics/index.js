import { combineEpics, createEpicMiddleware, } from 'redux-observable'

import uiEpics from './uiEpics'
import authEpics from './authEpics'
import intercomEpics from './intercomEpics'
import faceEpics from './facesEpics'
import keysEpics from './keysEpics'
import usersEpics from './usersEpics'
import flatEpics from './flatEpics'
import cameraEpics from './cameraEpics'

export const rootEpic = combineEpics(
  ...Object.values(authEpics),
  ...Object.values(uiEpics),
  ...Object.values(intercomEpics),
  ...Object.values(faceEpics),
  ...Object.values(keysEpics),
  ...Object.values(usersEpics),
  ...Object.values(flatEpics),
  ...Object.values(cameraEpics),
);

export const epicMiddleware = createEpicMiddleware();
