import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { generateRoom } from "../../Helper";
import Loading from "../Loading";

function GenerateRoom(props) {
    const [roomCode, setRoomCode] = useState('');

    const getRoom = async () => {
        var response = await generateRoom();
        setRoomCode("/room/" + response);
    }

    useEffect( () => {
        getRoom();
    }, []);

    return (
        <div>
        {roomCode ? <Redirect to={roomCode}></Redirect> : <Loading /> }
        </div>
    );
}

export default GenerateRoom;
