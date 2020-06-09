import React from 'react';
import { Redirect } from "react-router-dom";

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

    // !!! Check session list to make sure code doesn't exist, create a new session entry + claim the code, then redirect to code lobby !!!
    // let roomCodeGen;
    // do {
    //    roomCodeGen = generate_random_string(4);
    // } while (database.sessionExists(roomCodeGen));
    let roomCodeGen = generate_random_string(4);
    let redirectLink = "/room/" + roomCodeGen;

    return (
        <div>
            <Redirect to={redirectLink}></Redirect>;
        </div>
    );
}

export default GenerateRoom;
