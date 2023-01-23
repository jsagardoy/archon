'use client'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

interface Props {
  imgURL: string
  alt: string
  title: string
  detail: string
  URL: string
}

const HomeCard = ({ imgURL, alt, title, detail, URL }: Props) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(URL)
  }
  useEffect(() => {
    console.log({ imgURL })
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia component="img" height="140" image={imgURL} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {detail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default HomeCard
