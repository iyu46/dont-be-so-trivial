import React, { Suspense, lazy, useState, useEffect, useContext } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { HubConnectionProvider, UserContext, HubConnectionContext } from "./Context";

const Home = lazy(() => import('./components/Home'));
const GenerateRoom = lazy(() => import('./components/setup/GenerateRoom'));
const JoinGame = lazy(() => import('./components/setup/JoinGame'));
const Room = lazy(() => import('./components/setup/Room'));
const Game = lazy(() => import('./components/Game'));

function App() {
  const [currName, setCurrName] = useState('');
  const { executeCommand } = useContext(HubConnectionContext);

  useEffect(() => {
    const init = async () => {
      console.log('initializing')
      await executeCommand('start');
    }
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <UserContext.Provider value={{currName, saveUser: (name) => setCurrName(name)}}>
      <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/generate" component={GenerateRoom} exact />
            <Route path="/join" component={JoinGame} exact />
            <Route path="/room/:code" component={Room}/>
            <Route path="/game/:code" component={Game}/>
          </Switch>
        </Suspense>
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
