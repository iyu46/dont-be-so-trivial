import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
// import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    link: {
        color: "#61dafb",
    }
}));
function Room(props) {
    const {code} = useParams();
    const classes = useStyles();

    return (
        <div>
            <h1>Current game code is {code}</h1>
        </div>
    );
}

export default Room;
