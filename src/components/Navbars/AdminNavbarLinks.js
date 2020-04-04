import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { useStateValue } from "store/appState";
import { useHistory } from 'react-router-dom';
import SearchControl from "./SearchControl";
import ProfileMenu from "./ProfileMenu";
import { FormatTextdirectionLToR } from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import Button from "components/CustomButtons/Button.js";
import { EN } from "actions/resourceActions";
import ChangeLanguage from "./ChangeLanguage";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const [{ user ,resource}, dispatch] = useStateValue();
  


  const classes = useStyles();
  const [] = React.useState(null);
  const [] = React.useState(null);

 


  return (
    <div>
      {/* <SearchControl classes={classes} /> */}

      {/* <AppNotifications classes={classes} handleCloseNotification={handleCloseNotification}/> 
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}

        onClick = {changeResource}
      >

        <FormatTextdirectionLToR className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      */}
      <ChangeLanguage />
      <ProfileMenu classes={classes} />
    </div>
  );
}
