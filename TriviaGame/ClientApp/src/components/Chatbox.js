import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as signalR from '@microsoft/signalr';

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

function Chatbox(props) {
    const classes = useStyles();
    const [nick, setNick] = useState('');
    const [message, setMessage] = useState('');
    const [messageLog, setMessageLog] = useState([]);
    const [hubConnection, setHubConnection] = useState(null);
    const [ready, setReady] = useState(false);

    const sendMessage = () => {
        hubConnection.invoke('sendToAll', nick, message)
                                    .catch(err => console.error(err));
      
        setMessage('');
      };

    useEffect(() => {
        if (!ready) {
            const currNick = window.prompt('Your name:', 'Bicki');

            const newConnection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

            setNick(currNick);

            newConnection.start()
                                        .then(() => console.log('Connection started!'))
                                        .catch(err => console.log('Error establishing connection'));

            newConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = messageLog;
                messages.concat([text]);
                setMessageLog(messages);
            });

            setHubConnection(newConnection);
            setReady(true);
        }
      }, [])

    return (
        <div>
            <div>
                <br />
                <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                />

                <button onClick={() => sendMessage()}>Send</button>

                <div>
                {messageLog.map((message, index) => (
                    <span style={{display: 'block'}} key={index}> {message} </span>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Chatbox;