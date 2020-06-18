import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { generateRoom } from "../../Helper";
import Loading from "../Loading";

function generate_random_string(string_length){
    let random_string = '';
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90
    for (let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
  }

function GenerateRoom(props) {
    const [roomCode, setRoomCode] = useState('');
    // !!! Check session list to make sure code doesn't exist, create a new session entry + claim the code, then redirect to code lobby !!!
    // let roomCodeGen;
    // do {
    //    roomCodeGen = generate_random_string(4);
    // } while (database.sessionExists(roomCodeGen));
    //let roomCodeGen = generate_random_string(4);
    //let redirectLink = "/room/" + roomCodeGen;

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
