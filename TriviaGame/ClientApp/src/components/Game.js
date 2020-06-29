import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GrabBag from './game/GrabBag';
import Quickstarter from './game/Quickstarter';
import Chatbox from './Chatbox';
import { getSessionMembers, getGamePhase } from '../Helper';
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

const minigames = [
    () => "The game hasn't started yet...",
    (props) => <Quickstarter {...props} />
];
function Game(props) {
    const classes = useStyles();
    const [players, setPlayers] = useState([{ name: '' }, { name: '' }, { name: '' }, {name: ''}]);
    const [playersReady, setPlayersReady] = useState(false);
    const roomCode = props.match.params.code;
    // const minigame = <Quickstarter players={players} roomCode={roomCode}/>;
    const [minigame, setMinigame] = useState();
    const [gamePhase, setGamePhase] = useState(-1);
    const { currName } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async (roomCode) => {
            setPlayers(await getSessionMembers(roomCode));
        };

        fetchData(roomCode);
        setPlayersReady(true);
    }, []);

    useEffect(() => {
        const getGameState = async (roomCode) => {
            var gameState = await getGamePhase(roomCode);
            setGamePhase(gameState);
            /*if (gameState === -1) {
                setMinigame('Error loading game');
            } else {
                console.log(players);
                setMinigame(minigames[gameState]({players, roomCode}));
            }*/
        };

        if (players[0].name !== '') {
            getGameState(roomCode);
        }
    }, [players]);

    return (
        <div>
            <div style={{width: '80vw'}}>
                {gamePhase !== -1 ? minigames[gamePhase]({ players, roomCode }) : 'Error loading game'}
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