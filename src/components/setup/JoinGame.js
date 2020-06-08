import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, InputAdornment, FormControl, TextField, Grid } from '@material-ui/core';
import { AccountCircle, MeetingRoom } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        color: "#FFFFFF",
    },
}));

function JoinGame(props) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-username">Name</InputLabel>
                <Input
                id="input-username"
                startAdornment={
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                }
                />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-roomcode">Room Code</InputLabel>
                <Input
                id="input-roomcode"
                startAdornment={
                    <InputAdornment position="start">
                    <MeetingRoom />
                    </InputAdornment>
                }
                />
            </FormControl>
        </div>
    );
}

export default JoinGame;
