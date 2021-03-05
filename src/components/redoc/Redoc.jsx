import React from 'react'
import { RedocStandalone } from 'redoc'

const Redoc = () => {

  return (
    <RedocStandalone specUrl="/api-docs/oas-3.0.0.json"/>
  )
}

export default Redoc
