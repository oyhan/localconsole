import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import { useStateValue } from "store/appState";
import { LOGOFF } from "actions/userActions";
import classNames from "classnames";


export default function ProfileMenu({ classes }) {

    const [openProfile, setOpenProfile] = React.useState(null);

    const history = useHistory();

    const [{ user ,resource}, dispatch] = useStateValue();
    
    


    const handleLogOff = () => {
        dispatch({
            type: LOGOFF
        })
        history.push('/login-register');

    };
    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };


    const handleCloseProfile = () => {
        setOpenProfile(null);
    };

    return (

        user.isAuthenticated &&
        <div className={classes.manager}>
            <Button
                color={window.innerWidth > 959 ? "transparent" : "white"}
                justIcon={window.innerWidth > 959}
                simple={!(window.innerWidth > 959)}
                aria-owns={openProfile ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                onClick={handleClickProfile}
                className={classes.buttonLink}
            >
                <Person className={classes.icons} />
                <Hidden mdUp implementation="css">
                    <p className={classes.linkText}>Profile</p>
                </Hidden>
            </Button>
            <Poppers
                open={Boolean(openProfile)}
                anchorEl={openProfile}
                transition
                disablePortal
                className={
                    classNames({ [classes.popperClose]: !openProfile }) +
                    " " +
                    classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="profile-menu-list-grow"
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseProfile}>
                                <MenuList role="menu">
                                    <MenuItem

                                        className={classes.dropdownItem}
                                    >
                                        {user && user.Name}
                                    </MenuItem>
                                    {/* <MenuItem
                                        onClick={handleCloseProfile}
                                        className={classes.dropdownItem}
                                    >
                                        Profile
                        </MenuItem>
                                    <MenuItem
                                        onClick={handleCloseProfile}
                                        className={classes.dropdownItem}
                                    >
                                        Settings
                        </MenuItem> */}
                                    <Divider light />
                                    {
                                        user.isAuthenticated &&
                                        <MenuItem
                                            onClick={handleLogOff}
                                            className={classes.dropdownItem}
                                        >
                                            {
                                                resource.Exit
                                            }
                        </MenuItem>
                                    }

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Poppers>
        </div>
    )



}