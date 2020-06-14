import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
      button: {
          marginLeft: "16px",
          marginRight: "16px",
      },
}));

function Home(props) {
    const classes = useStyles();

    return (
        <div>
            <h1>Welcome to Don't Be So Trivial (title pending)!</h1>
            <Link to="/generate" className={classes.removeLinkStyling}>
                <Button variant="outlined" color="inherit" size="large" className={classes.button}>Host Game</Button>
            </Link>

            <Link to="/join" className={classes.removeLinkStyling}>
                <Button variant="outlined" color="inherit" size="large" className={classes.button}>Join Game</Button>
            </Link>
        </div>
    );
}

export default Home;
