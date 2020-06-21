import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GrabBag from './game/GrabBag';
import Quickstarter from './game/Quickstarter';
import Chatbox from './Chatbox';
import { getSessionMembers } from '../Helper';
import { UserContext } from "../Context";

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
    const [players, setPlayers] = useState([{ name: '' }, { name: '' }, { name: '' }, {name: ''}]);
    const roomCode = props.match.params.code;
    const { currName } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async (roomCode) => {
            setPlayers(await getSessionMembers(roomCode));
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
                        <Card>{player.name}</Card>
                    </Grid>
                    )}
                <Grid item xs={3} key={"dab"}>
                    <Chatbox name={currName} code={roomCode} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Game;