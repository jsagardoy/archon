'use client'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { City, Country, ICountry, IState, State } from 'country-state-city'
import React, { useRef, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import FilterListIcon from '@mui/icons-material/FilterList'
import { TournamentFilterValuesType } from '../../utils/types'

interface Props {
  filterValues: (filter: TournamentFilterValuesType) => void
}
const TableFilter = ({ filterValues }: Props) => {
  const [country, setCountry] = useState<ICountry | null>(null)
  const [state, setState] = useState<IState | null>(null)
  const [city, setCity] = useState<string | null>(null)

  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const filter: TournamentFilterValuesType = {
      country: country?.name ?? null,
      state: state?.name ?? null,
      city,
      startDate: startDateRef?.current?.value ?? null,
      endDate: endDateRef?.current?.value ?? null,
    }
    filterValues(filter)
  }
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setCountry(null)
    setState(null)
    setCity(null)
    if (startDateRef && startDateRef.current) {
      startDateRef.current.value = ''
    }
    if (endDateRef && endDateRef.current) {
      endDateRef.current.value = ''
    }

    const filter: TournamentFilterValuesType = {
      country: null,
      state: null,
      city: '',
      startDate: null,
      endDate: null,
    }
    filterValues(filter)
  }

  return (
    <Box sx={{ marginBottom: '1rem', display: 'flex', width: '100%' }}>
      <Box
        id="form_id"
        component="form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{ display: 'flex', minWidth: '100%' }}
      >
        <FormControl
          fullWidth
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
          }}
        >
          <Box
            id="date_container"
            sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}
          >
            <TextField
              inputRef={startDateRef}
              id="id_date"
              label="Start date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              inputRef={endDateRef}
              id="id_date"
              label="End date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box
            id="location_container"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
              minWidth: '33%',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="id_country_label">Country</InputLabel>
              <Select
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
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="id_state_label">State</InputLabel>
              <Select
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
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="id_state_label">City</InputLabel>
              <Select
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
            </FormControl>
          </Box>
          <ButtonGroup size="small">
            <Button type="submit" startIcon={<FilterListIcon />}>
              Apply Filters
            </Button>
            <Button type="reset" startIcon={<ClearIcon />}>
              Clear Filters
            </Button>
          </ButtonGroup>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableFilter
