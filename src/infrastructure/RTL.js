import React from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
let theme = createMuiTheme({
  palette :{
    primary: {
      dark : '#005b4f',
      light : '#4ebaaa',
      main : '#00897b'
    
    },
    secondary :{
      dark : '#883997',
      light : '#ee98fb',
      main : '#ba68c8'
    }
  },
  direction:'rtl',
  typography: {
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
export default function RTL(props) {
  const log =()=>{
    console.log("im here");
  }
  const someFunction = () => {
    console.log('do something');
  }

  
    const childrenWithProps = React.Children.map(props.children, child =>
      React.cloneElement(child, { someFunction: someFunction })
    );
  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        {childrenWithProps}
      </MuiThemeProvider>

    </StylesProvider>
  );
}