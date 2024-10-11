import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getPlacesData } from './api/index'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const theme = createTheme();

const App = () => {

    const [places, setplaces] = useState([])

    const [coordinates, setCoordinates] = useState({})

    const [bounds, setBounds] = useState({})

    const [onChildClicked, setonChildClicked] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [type, setType] = useState('restaurants')

    const [rating, setRating] = useState('')

    const [filterPlaces, setFilterPlaces] = useState([])

    const [autocomplete, setAutocomplete] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, []);

    useEffect(() => {
        if (places.length) {
            const filtered = places.filter((place) => Number(place.rating) > rating);
            setFilterPlaces(filtered);
        }
    }, [rating, places]);

    useEffect(() => {
        if (bounds && bounds.sw && bounds.ne) {
            //     console.log(coordinates, bounds);
            setIsLoading(true)
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log(data);
                    if (data && Array.isArray(data)) {
                        setplaces(data?.filter((places) => places.name && places.num_reviews > 0))
                        setFilterPlaces([])
                    } else
                        setplaces([])
                    setIsLoading(false)
                })
        }
    }, [type, bounds])

    // console.log(places)
    // console.log(filterPlaces)

    const onLoad = (autoC) => setAutocomplete(autoC)

    const onPlaceChanged = () => {
        if (!autocomplete) {
            console.error("Autocomplete is not initialized");
            return;
        }

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.error("Selected place does not have a valid location");
            return;
        }
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({ lat, lng })
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={12} md={4} sx={{ overflowY: 'auto' }}>
                    <List
                        places={filterPlaces.length ? filterPlaces : places}
                        onChildClicked={onChildClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>

                <Grid item xs={12} md={8} sx={{ position: "sticky", top: 0, height: "100%" }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setonChildClicked={setonChildClicked}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default App;
