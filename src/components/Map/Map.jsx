import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import Rating from '@mui/material/Rating'

import useStyles from './style'
// import { DisabledByDefaultOutlined } from '@mui/icons-material'

function Map({ setCoordinates, setBounds, coordinates, places, setonChildClicked }) {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        // bootstrapURLKeys = {{ key: 'eb57aeef6amshe76aca86b6c4fe5p1b7a19jsn58c638462161'}}
        // bootstrapURLKeys = {{ key: 'eb57aeef6amshe76aca86b6c4fe5p1b7a19jsn58c638462161'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{  disableDefaultUI: true, zoomControl: true}}
        onChange={(e) => {
          console.log(e);
          if (e.marginBounds) {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng })
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
          }
        }}
        onChildClicked={(child) => setonChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i} >

            {
              !isDesktop ? (
                <LocationOnOutlined color='primary' fontSize='large' />
              ) : (
                // <Paper elevation={2} className={classes.paper} >
                //   <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                //     {place.name}
                //   </Typography>
                //   <img className={classes.pointer}
                //   src={place.photo ? place.photo.images.large.url : 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg'}

                //   alt={place.name}  />

                <Paper elevation={2} sx={{ width: '100px', padding: '10px' }}> {/* Adjust width and padding as needed */}
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }} variant='subtitle2' gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}  // Adjust image to fit the Paper size
                    src={place.photo ? place.photo.images.large.url : 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg'}
                    alt={place.name}
                  />


                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
