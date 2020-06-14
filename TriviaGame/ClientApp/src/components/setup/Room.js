import React, {useState, useEffect} from 'react';
import { Input, InputLabel, FormControl, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { joinRoom, getSessionMembers } from '../../Helper.js';
// import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    removeLinkStyling: {
        '&:link, &:visited, &:hover': {
            color: 'inherit',
            textDecoration: 'none',
        },
        '&:active': {
            color: 'inherit',
            fontWeight: 'bold',
            textDecoration: 'none',
        },
      },
    member: {
        padding: 30,
        width: '50%',
        height: '30%',
    }
}));
function Room(props) {
    const {code} = useParams();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [joined, setJoined] = useState(false);
    const [sessionMembers, setSessionMembers] = useState(new Array(4));

    const handleJoin = async (e) => {
        e.preventDefault();
        var resp = await joinRoom(name, code);
        // TODO: Check if success
        setJoined(true);
    }

    const startGame = (e) => {
        //console.log("started");
    }

    useEffect(() => {
        const fetchData = async (roomCode) => {
            setSessionMembers((await getSessionMembers(roomCode)).data.value);
        };

        fetchData(code);
        //console.log('fetched');
    }, [code, joined]);

    useEffect(() => {
        console.table(sessionMembers);
    }, [sessionMembers]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.member}>{sessionMembers[0]}</Grid>
                <Grid item xs={6} className={classes.member}>{sessionMembers[1]}</Grid>
            </Grid>
            <h1>Current game code is {code}</h1>
            { !joined ?
            <form onSubmit={handleJoin}>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-username">Name</InputLabel>
                <Input
                    id="input-username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <Button variant="contained" type="submit">Join</Button>
            </form>
            : <Link to={"/game/" + code} className={classes.removeLinkStyling}><Button variant="contained" onClick={(e) => startGame(e)}>Start Game</Button></Link> }
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.member}>{sessionMembers[2]}</Grid>
                <Grid item xs={6} className={classes.member}>{sessionMembers[3]}</Grid>
            </Grid>
        </div>
    );
}

export default Room;
