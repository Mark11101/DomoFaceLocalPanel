import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import IntercomScreen from './intercom-screen/IntercomScreenContainer'
import ResidentScreen from './resident-screen/ResidentScreenContainer'
import NotFoundScreen from './not-found-screen/NotFoundScreen'
import Redoc from './redoc/Redoc'
import SignIn from './sign-in/SignInContainer'
import NotificationsProvider from '../utils/notifications/NotificationsProvider'
import UpdateHandler from './subcomponents/update-handler/UpdateHandlerContainer'
import history from '../url/history'

import './App.css'
import '../styles/variables.css'
import '../styles/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  
  return (
    <Router history={history}>
      <NotificationsProvider />
      <div className='b-app'>
        <UpdateHandler />
        <div className='b-app__main-content'> 
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path='/intercom-screen' component={IntercomScreen} />
            <Route path='/resident-screen' component={ResidentScreen} />
            <Route path='/redoc' component={Redoc} />
            <Route component={NotFoundScreen} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
