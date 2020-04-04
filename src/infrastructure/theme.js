
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction : "rtl",
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'IranSansFa',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
  }});


  export {theme}