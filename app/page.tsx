import React from 'react'
import {SnackbarContextProvider} from './context/SnackbarContext'

const HomePage = () => {
  return (
    <>
      <SnackbarContextProvider>
        <div>HomePage</div>
      </SnackbarContextProvider>
    </>
  )
}

export default HomePage
