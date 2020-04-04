import React from 'react';
import { CircularProgress } from '@material-ui/core';
import LinearProgress from 'components/LinearProgress/LinearProgress';

export default function AppLoader(props) {


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <LinearProgress />

            {/* <CircularProgress
                // className={classes.progress}
                color="secondary" /> */}

        </div>
    )
}
