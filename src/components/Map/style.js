import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
     display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%',
  },
  mapContainer: {
    height: '91vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
}));