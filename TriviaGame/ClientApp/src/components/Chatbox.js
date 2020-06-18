import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

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
    const [draw, setDraw] = useState(false);

    const sendMessage = async () => {
        try {
            await hubConnection.invoke('sendToAll', nick, message)
                                    .catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
        setMessage('');
      };

    useEffect(() => {
        const createHubConnection = async () => {
            setNick(props.name);

            const newConnection = new HubConnectionBuilder().withUrl("https:/localhost:44302/chathub").build();

            try {
                await newConnection.start()
                                            .then(() => console.log('Connection started!'))
                                            .catch(err => console.log('Error establishing connection'));

                newConnection.on('sendToAll', (nick, receivedMessage) => {
                    setMessageLog(m => [...m, `${nick}: ${receivedMessage}`]);
                    console.table(messageLog);
                });
            } catch (err) {
                alert(err);
            }
            setHubConnection(newConnection);
        }

        createHubConnection();
        setReady(true);
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