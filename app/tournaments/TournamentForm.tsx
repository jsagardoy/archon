'use client'

import { Box, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'

const TournamentForm = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const numberOfRoundsRef = useRef<HTMLInputElement>(null)
  const maxNumbOfPlayersRef = useRef<HTMLInputElement>(null)
  const detailsRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)

  const isActive = (tournamentDate: string | undefined) => {
    if (!tournamentDate) {
      return false
    }
    if (tournamentDate) {
      const today = new Date()
      const tournamentDateFormated = new Date(tournamentDate)
      tournamentDateFormated.setHours(23, 59, 59)

      console.log(today.getTime())
      console.log(tournamentDateFormated.getTime())
      return today.getTime() <= tournamentDateFormated.getTime()
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTournament = {
      name: nameRef.current?.value,
      dateRef: nameRef.current?.value,
      hour: hourRef.current?.value,
      number_of_rounds: numberOfRoundsRef.current?.value,
      max_num_of_players: maxNumbOfPlayersRef.current?.value,
      details: detailsRef.current?.value,
      date: dateRef.current?.value,
      price: priceRef.current?.value,
      city: cityRef.current?.value,
      country: countryRef.current?.value,
      address: addressRef.current?.value,
      active: isActive(dateRef.current?.value),
      players: [],
    }
    console.log(newTournament)
  }
  /*  id: string
          name: string | null
          date: string | null
          hour: string | null
          number_of_rounds: string | null
          max_numb_of_players: string | null
          active: boolean | null
          details: string | null
          price: number | null
          city: string | null
          country: string | null
          address: string | null
          players: any[] | null  */

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexDirection: 'column',
      }}
    >
      <TextField
        required
        fullWidth
        inputRef={nameRef}
        id="id_name"
        label="Name"
      />
      <TextField
        required
        inputRef={dateRef}
        id="id_date"
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField inputRef={hourRef} id="id_hour" label="Starting time" />
      <TextField
        required
        inputRef={numberOfRoundsRef}
        id="id_numberOfRounds"
        label="Number of rounds (including the final)"
        type="number"
      />
      <TextField
        required
        inputRef={maxNumbOfPlayersRef}
        id="id_maxNumbOfPlayers"
        label="Maximun number of players"
        type="number"
      />
      <TextField inputRef={detailsRef} id="id_details" label="Details" />
      <TextField inputRef={priceRef} id="id_price" label="Price" />
      <TextField required inputRef={cityRef} id="id_city" label="City" />
      {/* TODO: include dropdownList */}
      <TextField
        required
        inputRef={countryRef}
        id="id_country"
        label="Country"
      />
      {/*  TODO: include dropdownList */}
      <TextField
        required
        inputRef={addressRef}
        id="id_address"
        label="Tournament address"
      />
      <Button type="submit">Create Tournament</Button>
    </Box>
    
  )
}

export default TournamentForm
