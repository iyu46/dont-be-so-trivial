import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GrabBag from './game/GrabBag';
import Quickstarter from './game/Quickstarter';
import Chatbox from './Chatbox';
import { getSessionMembers } from '../Helper';

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
}));

function Game(props) {
    const classes = useStyles();
    const minigame = <Quickstarter/>;
    const [players, setPlayers] = useState([]);
    const roomCode = props.match.params.code;
    const name = '';

    useEffect(() => {
        const fetchData = async (roomCode) => {
            setPlayers((await getSessionMembers(roomCode)).data.value);
        };

        fetchData(roomCode);
    }, [roomCode]);

    return (
        <div>
            <div style={{width: '80vw'}}>
            {minigame}
            </div>
            <Grid container spacing={3}>
                {players.map((player, i) => 
                    <Grid item xs={3} key={i}>
                        <Card>{player}</Card>
                    </Grid>
                    )}
                <Grid item xs={3} key={"dab"}>
                    <Chatbox name={name} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Game;