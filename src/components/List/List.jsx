import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import PlaceDetails from '../PlaceDetails/Place'
import useStyles from './style'

function List({ places, onChildClicked, isLoading, type, setType, rating, setRating }) {
  const classes = useStyles();

  // console.log({ onChildClicked })

  const [elRef, setElRef] = useState([])

  useEffect(() => {
    setElRef((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()))
  }, [places])

  return (
    <>
      <div className={classes.container}>
        <Typography variant='h5'>Restorants, Hotels & Attractions around you</Typography><br />
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size='5rem' />
          </div>
        ) : (

          <>
            <FormControl className='classes.formControl'>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value='restaurants'>Restaurants</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
                <MenuItem value='attractions'>Attractions</MenuItem>
              </Select>
            </FormControl>

            <FormControl className='classes.formControl'>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={3} className='{classes.list}'>
              {places?.map((place, i) => (
                <Grid item key={i} xs={12}>
                  <PlaceDetails place={place}
                    selected={Number(onChildClicked) === i}
                    refProp={elRef[i]}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </>
  )
}

export default List
