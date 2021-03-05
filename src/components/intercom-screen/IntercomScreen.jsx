import React from 'react'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../subcomponents/navigation-bar/NavigationBarContainer'
import Intercom from '../views/intercom/IntercomContainer'
import Flat from '../views/flat/FlatContainer'
import Keys from '../views/keys/KeysContainer'
import Faces from '../views/faces/FacesContainer'
import Users from '../views/users/UsersContainer'
import Roles from '../../constants/Roles'

import './IntercomScreen.css'

const IntercomScreen = (props) => {
  const {
    role,
    isLogged,
    intercomHealth,
    requestIntercomHealthCheck,
  } = props;

  React.useEffect(() => {

    requestIntercomHealthCheck()
  }, [requestIntercomHealthCheck])
  
  if (
    !isLogged || 
    role === Roles.USER || 
    !intercomHealth
  ) {
    return (
      <Redirect 
        to={{
          pathname: '/',
        }}
      />
    )
  }

  return (
    <div className='b-intercom-screen'>
      <NavigationBar tabs={['Домофон', 'Квартиры', 'Ключи', 'Лица', 'Аккаунты']}>
        <Intercom />
        <Flat />
        <Keys />
        <Faces />
        <Users />
      </NavigationBar>
    </div>
  )
}

export default IntercomScreen
