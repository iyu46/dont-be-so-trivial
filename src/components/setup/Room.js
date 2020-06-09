import React, {useState} from 'react';
import { Input, InputLabel, FormControl, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import * as helper from '../../Helper.js';
// import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    link: {
        color: "#61dafb",
    }
}));
function Room(props) {
    const {code} = useParams();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [joined, setJoined] = useState(false);

    const handleJoin = async (e) => {
        e.preventDefault();
        var resp = await helper.joinRoom(name, code);
        // TODO: Check if success
        setJoined(true);
    }

    return (
        <div>
            <h1>Current game code is {code}</h1>
            { !joined ? <form onSubmit={handleJoin}>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-username">Name</InputLabel>
                <Input
                    id="input-username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <Button variant="contained" type="submit">Join</Button>
            </form> : '' }

        </div>
    );
}

export default Room;
