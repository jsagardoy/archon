'use client'

import { Skeleton, Stack } from '@mui/material'

import React from 'react'

const Loading = () => {
  return (
    <Stack sx={{display:'flex',justifyContent:'center', alignItems:'center'}} spacing={1}>
      {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      */}
      <Skeleton variant="circular" width={200} height={200} /> 
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={100} height={40} />
    </Stack>
  )
}

export default Loading
