import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoomOutlined'
import VpnKeyIcon from '@material-ui/icons/VpnKeyOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccountOutlined'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import VideocamIcon from '@material-ui/icons/VideocamOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { ReactComponent as IntercomIcon } from '../../../images/intercom.svg'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './NavigationBar.css'

const NavigationBar = (props) => {
  const {
    tabs,
    children,
    setDisplayedView,
  } = props;

  const deviceType = useDevice();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    
    setValue(index);
  };

  const handleTabClick = (type) => {

    setDisplayedView(type)
  }

  const outputIconTab = (tab) => {
    
    switch (tab) {
      case 'Домофон':
        return <IntercomIcon />
      
      case 'Квартиры':
        return <MeetingRoomIcon size={50} />

      case 'Ключи':
        return <VpnKeyIcon />

      case 'Лица':
        return <FaceIcon />

      case 'Аккаунты':
        return <SupervisorAccountIcon />

      case 'Списки':
        return <FormatListBulletedIcon />

      case 'Архив':
        return <VideocamIcon />

      case 'Аккаунт':
        return <AccountCircleIcon />
            
      default:
        break;
    }
  }

  const getConvertedViewName = (tab) => {

    switch (tab) {
      case 'Домофон':
        return 'intercom-view'
      
      case 'Квартиры':
        return 'flat-view'

      case 'Ключи':
        return 'keys-view'

      case 'Лица':
        return 'faces-view'

      case 'Аккаунты':
        return 'accounts-view'

      case 'Списки':
        return 'lists-view'

      case 'Архив':
        return 'video-archive-view'

      case 'Аккаунт':
        return 'account-view'
            
      default:
        break;
    }
  }

  const outputTabs = (tabs) => {
    
    return tabs.map((tab, index) => 
      <Tab 
        icon={
          deviceType !== DeviceTypes.DESKTOP
          ?
            outputIconTab(tab)
          :
            tab
        } 
        key={index} 
        onClick={() => handleTabClick(getConvertedViewName(tab))}
      />
    )
  }
  
  return (
    <>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
        disabled={true}
      >
        {children}
      </SwipeableViews>
      <div className='b-navbar'>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            className='b-navbar__tabs'
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            TabIndicatorProps={{style: {background:'var(--secondary-color)'}}}
          >
            {outputTabs(tabs)}
          </Tabs>
        </AppBar>
      </div>
    </>
  )
}

export default NavigationBar
