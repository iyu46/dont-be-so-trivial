import React, { useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, InputAdornment, FormControl, Typography, Button } from '@material-ui/core';
import { AccountCircle, MeetingRoom } from '@material-ui/icons';
import { UserContext, HubConnectionContext } from "../../Context.js";
import { joinRoom } from '../../Helper.js';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        color: "#FFFFFF",
    },
}));

function JoinGame(props) {
    const classes = useStyles();
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');
    const [hubError, setHubError] = useState('');
    const { hubConnection, executeCommand } = useContext(HubConnectionContext);
    const { currName, saveUser } = useContext(UserContext);


    const handleJoin = async (e) => {
        e.preventDefault();
        var roomError = false;
        var connectionError = false;
        try {
            await joinRoom(currName, room);
        } catch (err) {
            console.log(err.response);
            roomError = true;
            setError(err.response.data);
        }
        try {
            if (!roomError) {
                await hubConnection.invoke('joinRoom', currName, room);
            }
        } catch (err) {
            console.error(err.response);
            connectionError = true;
            setHubError(err.response.data);
        }
        if (!roomError && !connectionError) {
            props.history.push(`/room/${room}`);
        }
    }

    return (
        <div>
            <form onSubmit={handleJoin}>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor="input-username">Name</InputLabel>
                <Input
                id="input-username"
                value={currName}
                onChange={(e) => saveUser(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                }
                />
            </FormControl>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor="input-roomcode">Room Code</InputLabel>
                <Input
                id="input-roomcode"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                    <MeetingRoom />
                    </InputAdornment>
                }
                />
            </FormControl>
            <Button variant="contained" type='submit'>Join room</Button>
            </form>
            {(error || hubError) ?
                <Typography>
                    {error}{hubError}
                </Typography>
            : ''}
        </div>
    );
}

export default withRouter(JoinGame);
