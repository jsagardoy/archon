'use client'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { City, Country, State } from 'country-state-city'
import { ICity, ICountry, IState } from 'country-state-city'
import React, { useRef, useState } from 'react'
import { ZodFormattedError, number, z } from 'zod'

import { AlertType } from '../../utils/types'
import { TournamentType } from '../../utils/database.types'
import getSymbolFromCurrency from 'currency-symbol-map'
import { supabase } from '../../utils/supabase'
import useSnackbar from '../hooks/useSnackbar'
import { useUser } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  handleClose: () => void
}
const TournamentForm = ({ handleClose }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const numberOfRoundsRef = useRef<HTMLInputElement>(null)
  const maxNumOfPlayersRef = useRef<HTMLInputElement>(null)
  const detailsRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const [validationResult, setValidationResult] = useState<
    ZodFormattedError<
      {
        country: string
        description: string
        state: string
        city: string
        name: string
        date: string
        hour: string
        number_of_rounds: string
        max_num_of_players: string
        details: string
        price: string
        user_id: string
        address: string
      },
      string
    >
  >()

  const [country, setCountry] = useState<ICountry | null>(null)
  const [state, setState] = useState<IState | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const user = useUser()
  const { setAlert } = useSnackbar()

  const FormSchema = z.object({
    name: z.string()?.min(1),
    date: z.string().min(1),
    hour: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    number_of_rounds: z
      .string()
      .min(1)
      .regex(/^[1-9]\d*$/),
    max_num_of_players: z
      .string()
      .min(1)
      .regex(/^[1-9]\d*$/),
    details: z.string(),
    price: z
      .string()
      .min(1)
      .regex(/^[+]?\d+([.]\d+)?$/),
    country: z.string().min(1),
    state: z.string().min(1),
    user_id: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
  })

  const isActive = (tournamentDate: string | undefined) => {
    if (!tournamentDate) {
      return false
    }
    if (tournamentDate) {
      const today = new Date()
      const tournamentDateFormated = new Date(tournamentDate)
      tournamentDateFormated.setHours(23, 59, 59)
      return today.getTime() <= tournamentDateFormated.getTime()
    }
  }

  const insertTournamentInDatabase = async (newTournament: TournamentType) => {
    try {
      const { data, error } = await supabase
        .from('tournament')
        .insert([newTournament])

      if (error) {
        throw error
      }

      const newAlert: AlertType = {
        open: true,
        severity: 'success',
        message: 'Tournament added',
      }
      setAlert(newAlert)
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: 'Error creating tournament',
      }
      setAlert(newAlert)
      console.error({ error })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (user && user.id) {
      const newTournament: TournamentType = {
        id:null,
        name: nameRef.current?.value ?? null,
        description: descriptionRef.current?.value ?? null,
        date: dateRef.current?.value ?? null,
        hour: hourRef.current?.value ?? null,
        number_of_rounds: numberOfRoundsRef.current?.value ?? '0',
        max_num_of_players: maxNumOfPlayersRef.current?.value ?? '0',
        details: detailsRef.current?.value ?? null,
        price: priceRef.current?.value ?? null,
        country: country?.name ?? '',
        state: state?.name ?? '',
        city: city ?? '',
        address: addressRef.current?.value ?? null,
        active: isActive(dateRef.current?.value) ?? false,
        user_id: user.id,
        players: null,
        currency:country?.currency??null,
      }
      try {
        const validation = FormSchema.safeParse(newTournament)

        if (!validation.success) {
          setValidationResult(validation.error.format())
        }
        if (validation.success) {
          await insertTournamentInDatabase(newTournament)
          handleClose()
        }
      } catch (error) {
        const newAlert: AlertType = {
          message: 'Error',
          open: true,
          severity: 'error',
        }
        setAlert(newAlert)
        console.error(error)
      }
    }
  }

  const handleCountry = (e: SelectChangeEvent) => {
    setCountry((prev) => Country.getCountryByCode(e.target.value) ?? prev)
    setState(null)
    setCity('')
  }
  const handleState = (e: SelectChangeEvent) => {
    setState((prev) => State.getStateByCode(e.target.value) ?? prev)
    setCity('')
  }
  const handleCity = (e: SelectChangeEvent) => {
    setCity((prev) => e.target.value ?? prev)
  }

  return (
    <>
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
          error={validationResult?.name?._errors !== undefined}
          helperText={validationResult?.name?._errors.join(', ') || ''}
          required
          fullWidth
          inputRef={nameRef}
          id="id_name"
          label="Name"
        />
        <TextField
          error={validationResult?.description?._errors !== undefined}
          helperText={validationResult?.description?._errors.join(', ') || ''}
          fullWidth
          inputRef={descriptionRef}
          id="id_description"
          label="Description"
          multiline
        />
        <TextField
          error={validationResult?.date?._errors !== undefined}
          helperText={validationResult?.date?._errors.join(', ') || ''}
          required
          inputRef={dateRef}
          id="id_date"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          error={validationResult?.hour?._errors !== undefined}
          helperText={validationResult?.hour?._errors.join(', ') || ''}
          inputRef={hourRef}
          id="id_hour"
          label="Starting time"
        />
        <TextField
          error={validationResult?.number_of_rounds?._errors !== undefined}
          helperText={
            validationResult?.number_of_rounds?._errors.join(', ') || ''
          }
          required
          inputRef={numberOfRoundsRef}
          id="id_numberOfRounds"
          label="Number of rounds (including the final)"
          type="number"
        />
        <TextField
          error={validationResult?.max_num_of_players?._errors !== undefined}
          helperText={
            validationResult?.max_num_of_players?._errors.join(', ') || ''
          }
          required
          inputRef={maxNumOfPlayersRef}
          id="id_maxNumbOfPlayers"
          label="Maximun number of players"
          type="number"
        />
        <TextField
          error={validationResult?.details?._errors !== undefined}
          helperText={validationResult?.details?._errors.join(', ') || ''}
          inputRef={detailsRef}
          multiline
          id="id_details"
          label="Details"
        />
        <TextField
          error={validationResult?.price?._errors !== undefined}
          helperText={validationResult?.price?._errors.join(', ') || ''}
          inputRef={priceRef}
          type='number'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {country && getSymbolFromCurrency(country?.currency)}
              </InputAdornment>
            ),
          }}
          id="id_price"
          label="Price"
        />
        <FormControl fullWidth>
          <InputLabel required id="id_country_label">
            Country
          </InputLabel>
          <Select
            error={validationResult?.country?._errors !== undefined}
            labelId="id_country_label"
            id="id_country"
            onChange={handleCountry}
            value={country ? country.isoCode : ''}
          >
            {Country.getAllCountries().map((c) => (
              <MenuItem key={c.isoCode} value={c.isoCode}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={validationResult?.city?._errors !== undefined}>
            {validationResult?.country?._errors.join(', ') || ''}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="id_state_label">
            State
          </InputLabel>
          <Select
            error={validationResult?.state?._errors !== undefined}
            disabled={!country || country?.isoCode === ''}
            labelId="id_state_label"
            id="id_state"
            onChange={handleState}
            value={state ? state.isoCode : ''}
          >
            {State.getStatesOfCountry(country?.isoCode).map((s) => (
              <MenuItem key={s.isoCode} value={s.isoCode}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={validationResult?.city?._errors !== undefined}>
            {validationResult?.state?._errors.join(', ') || ''}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="id_state_label">
            City
          </InputLabel>
          <Select
            error={validationResult?.city?._errors !== undefined}
            disabled={
              !country ||
              country?.isoCode === '' ||
              !state ||
              state?.isoCode === ''
            }
            labelId="id_city_label"
            id="id_city"
            value={city ? city : ''}
            onChange={handleCity}
          >
            {country &&
              state &&
              City.getCitiesOfState(country?.isoCode, state?.isoCode).map(
                (c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                )
              )}
          </Select>
          <FormHelperText error={validationResult?.city?._errors !== undefined}>
            {validationResult?.city?._errors.join(', ') || ''}
          </FormHelperText>
        </FormControl>
        <TextField
          required
          inputRef={addressRef}
          id="id_address"
          label="Tournament address"
        />
        <Button disabled={!user} type="submit">
          Create Tournament
        </Button>
      </Box>
    </>
  )
}

export default TournamentForm
