import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GrabBag from './game/GrabBag';

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
    const minigame = <GrabBag/>;

    return (
        <div>
            {minigame}
            <p>Heres all the peoples names</p>
        </div>
    );
}

export default Game;