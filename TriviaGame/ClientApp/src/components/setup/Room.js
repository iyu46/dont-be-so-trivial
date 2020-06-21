import React, {useState, useEffect, useContext} from 'react';
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { joinRoom, incrementGamePhase, getSessionMembers } from '../../Helper.js';
import { UserContext, HubConnectionContext } from "../../Context.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input, InputLabel, InputAdornment, FormControl, Grid, Button, Typography, IconButton } from '@material-ui/core';
import { AccountCircle, Assignment, AssignmentTurnedIn, Link, DoneOutline } from '@material-ui/icons';

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
    margin: {
        margin: '0px',
    },
    white: {
        color: "#FFFFFF",
    },
    member: {
        padding: 30,
        width: '50%',
        height: '30%',
    },
    copyButton: {
        color: "white",
    }
}));
function Room(props) {
    const {code} = useParams();
    const classes = useStyles();
    const [name, setName] = useState('');
    const { currName, saveUser } = useContext(UserContext);
    const { hubConnection, executeCommand } = useContext(HubConnectionContext);
    const [joined, setJoined] = useState(false);
    const [failed, setFailed] = useState('');
    const [sessionMembers, setSessionMembers] = useState([{ name: '' }, { name: '' }, { name: '' }, {name: ''}]);
    const [copied, setCopied] = useState('');
    const currentUrl = "http://localhost:3000" + props.location.pathname; // CHANGE THIS FOR DEPLOYMENT

    const copyToClipboard = (e, action) => {
        e.preventDefault();
        if (!copied.includes(action))
            setCopied(copied + action);
    }

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            var resp = await joinRoom(name, code);
        } catch (err) {
            console.log(err);
            console.log(err.response);
            setFailed(err.response.data);
        }
        try {
            await hubConnection.invoke('joinRoom', name, code);
        } catch (err) {
            console.error(err);
        }
        setJoined(true);
    }

    const startGame = async (e) => {
        try {
            await hubConnection.invoke('startGame', code);
            var resp = await incrementGamePhase(code);
            props.history.push(`/game/${code}`);
        } catch (err) {
            console.error(err.response.data);
        }
    }

    useEffect(() => {
        const fetchUsers = async (roomCode) => {
            setJoined(true);
            setSessionMembers(await getSessionMembers(roomCode));
        };
        if (currName) {
            fetchUsers(code);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async (roomCode) => {
            while (!hubConnection) {}
            try {
                hubConnection.on('joinRoom', async (name, room) => {
                    setSessionMembers(await getSessionMembers(roomCode));
                    //console.log(sessionMembers)
                });
                hubConnection.on('startGame', async (room) => {
                    console.log("signalr start");
                    props.history.push(`/game/${code}`);
                });
            } catch (err) {
                alert(err);
            }
        };
        fetchUsers(code);
        executeCommand('updateWithEvent', hubConnection);

    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.member}>{sessionMembers[0] ? sessionMembers[0].name : ''}</Grid>
                <Grid item xs={6} className={classes.member}>{sessionMembers[1] ? sessionMembers[1].name : ''}</Grid>
            </Grid>
            <h1>
            Current game code is {code}
            {<CopyToClipboard text={code}>
                <IconButton aria-label="copy code to clipboard" onClick={(e) => {copyToClipboard(e, "code")}} className={classes.copyButton}>
                    {copied.includes("code") ? <AssignmentTurnedIn /> : <Assignment />}
                </IconButton>
            </CopyToClipboard>}
            {<CopyToClipboard text={currentUrl}>
                <IconButton aria-label="copy url to clipboard" onClick={(e) => {copyToClipboard(e, "url")}} className={classes.copyButton}>
                    {copied.includes("url") ? <DoneOutline /> : <Link />}
                </IconButton>
            </CopyToClipboard>}
            </h1>
            {!joined ?
                <form onSubmit={handleJoin}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-username" className={classes.white}>Name</InputLabel>
                        <Input
                            id="input-username"
                            value={name}
                            placeholder="Player"
                            onChange={(e) => { setName(e.target.value); saveUser(name); }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle className={classes.white} />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">Join</Button>
                </form>
                : !failed ?
                <Button variant="contained" onClick={(e) => startGame(e)}>Start Game</Button>
                : <Typography>{failed}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.member}>{sessionMembers[2] ? sessionMembers[2].name : ''}</Grid>
                <Grid item xs={6} className={classes.member}>{sessionMembers[3] ? sessionMembers[3].name : ''}</Grid>
            </Grid>
        </div>
    );
}

export default withRouter(Room);
