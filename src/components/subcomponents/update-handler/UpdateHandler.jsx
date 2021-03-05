import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './UpdateHandler.css'

const UpdateHandler = (props) => {
  const {
    isIntercomLoading,
    isFaceLoading,
    isKeysLoading,
    isPinCodesLoading,
    isQrCodesLoading,
    isFlatLoading,
    isUsersLoading,
    isAuthLoading,
    isLineSignalLoading,
  } = props;

  const [scrollYPixels, setScrollYPixels] = React.useState('');

  window.onscroll = () => {

    setScrollYPixels(window.scrollY + '')
  }
  
  return (
    <>
      {
        (
          isFaceLoading    || isKeysLoading      || isPinCodesLoading ||
          isQrCodesLoading || isIntercomLoading  || isFlatLoading ||
          isUsersLoading   || isAuthLoading      || isLineSignalLoading
        ) 
        &&
          <div 
            className='b-update-handler' 
            style={
              {
                top: scrollYPixels + 'px',
              }
            }
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
      }
    </>
  )
}

export default UpdateHandler
