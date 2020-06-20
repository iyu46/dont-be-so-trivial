import React, {useState, useEffect, useContext} from 'react';
import { Input, InputLabel, InputAdornment, FormControl, TextField, Grid, Button, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { joinRoom, getSessionMembers } from '../../Helper.js';
import { UserContext, HubConnectionContext } from "../../Context.js";
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
    }
}));
function Room(props) {
    const {code} = useParams();
    const classes = useStyles();
    const [name, setName] = useState('');
    const { saveUser } = useContext(UserContext);
    const { hubConnection, executeCommand } = useContext(HubConnectionContext);
    const [joined, setJoined] = useState(false);
    const [failed, setFailed] = useState('');
    const [sessionMembers, setSessionMembers] = useState([{ name: '' }, { name: '' }, { name: '' }, {name: ''}]);


    const isNull = (element) => {
        return (element == null);
    }

    const handleJoin = async (e) => {
        e.preventDefault();
        saveUser(name);
        try {
            var resp = await joinRoom(name, code);
        } catch (err) {
            console.log(err);
            console.log(err.response);
            setFailed(err.response.data);
        }
        try {
            await hubConnection.invoke('joinRoom', name, code)
                .catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
        // TODO: Check if success
        console.log("joined");
        //console.table(resp);
        /*var newMembers = sessionMembers;
        for (var i = 0; i < resp.data.length; i++) {
            newMembers[newMembers.findIndex(isNull)] = resp.data[i].name;
        }
        console.log(newMembers);
        setSessionMembers(newMembers);*/
        setJoined(true);
    }

    const startGame = (e) => {
        //console.log("started");
    }

    useEffect(() => {
        const fetchData = async (roomCode) => {
            //setSessionMembers((await getSessionMembers(roomCode)).data.value);
            //console.log(sessionMembers);
        };

        fetchData(code);
        //console.log('fetched');
    }, [code, joined]);

    useEffect(() => {
        //console.log(sessionMembers);
    }, []);

    useEffect(() => {
        const fetchUsers = async (roomCode) => {
            try {
                hubConnection.on('joinRoom', async (name, room) => {
                    var members = await getSessionMembers(roomCode);
                    setSessionMembers(members);
                    //console.log(sessionMembers)
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
            <h1>Current game code is {code}</h1>
            {!joined ?
                <form onSubmit={handleJoin}>
                    {/* <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-username">Name</InputLabel>
        <Input
            id="input-username"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </FormControl> */}
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-username" className={classes.white}>Name</InputLabel>
                        <Input
                            id="input-username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start" className={classes.white}>
                                    <AccountCircle className={classes.white} />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">Join</Button>
                </form>
                : !failed ?
                <Link to={"/game/" + code} className={classes.removeLinkStyling}>
                    <Button variant="contained" onClick={(e) => startGame(e)}>Start Game</Button>
                </Link>
                : <Typography>{failed}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.member}>{sessionMembers[2] ? sessionMembers[2].name : ''}</Grid>
                <Grid item xs={6} className={classes.member}>{sessionMembers[3] ? sessionMembers[3].name : ''}</Grid>
            </Grid>
        </div>
    );
}

export default Room;
