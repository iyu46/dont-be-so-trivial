import React, { useState, useContext } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const HubConnectionContext = React.createContext(null);
export const UserContext = React.createContext({
    currName: '',
    getUser: () => {},
    saveUser: () => {}
});

/*export const UserConsumer = UserContext.Consumer
export const UserProvider = ({ children, settings }) => {
    const [currName, setCurrName] = useState('');

    const saveUser = (name) => {
        setCurrName(name);
        //console.log(currName);
    }
        console.log(currName);
    return (
        <UserContext.Provider value = {{ currName, saveUser }}>
            {children}
        </UserContext.Provider>
    );

}*/

export const HubConnectionConsumer = HubConnectionContext.Consumer
export const HubConnectionProvider = ({ children, settings }) => {
    const [lastCommand, setCommand] = useState(null);
    const [hubConnection, setHubConnection] = useState(null);

    const start = async () => {
        const newConnection = new HubConnectionBuilder().withUrl("http://localhost:5890/gamehub").build();
        //const newConnection = new HubConnectionBuilder().withUrl("https:/localhost:44302/gamehub").build();

        try {
            await newConnection.start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error establishing connection'));
        } catch (err) {
            alert(err);
        }
        setHubConnection(newConnection);
    }

    const end = async () => {
        const newConnection = hubConnection;

        try {
            await newConnection.stop()
                .then(() => console.log('Connection stopped!'))
                .catch(err => console.log('Error stopping connection'));
        } catch (err) {
            alert(err);
        }
        setHubConnection(newConnection);
    }

    const updateWithEvent = (object) => {
        // update the current hub connection with one that has a new event added on
        setHubConnection(object);
    }

    const executeCommand = async (input, newObject = null) => {
        if (input === "start" && lastCommand === null) {
            await start();
            setCommand("start");
        } else if (input === "end" && lastCommand === "start") {
            await end();
            setCommand("end");
        } else if (input === "updateWithEvent") {
            updateWithEvent(newObject);
        }
    }

    return (
        <HubConnectionContext.Provider value = {{ hubConnection, executeCommand }}>
            {children}
        </HubConnectionContext.Provider>
    );

}

/*export const useUserContext = () => {
    const hook = useContext(UserContext)
    return hook;
}*/

export const useHubConnectionContext = () => {
    const hook = useContext(HubConnectionContext)
    return hook;
}


export {
    HubConnectionContext,
    //UserContext
};