import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";

const Home = lazy(() => import('./components/Home'));
const GenerateRoom = lazy(() => import('./components/setup/GenerateRoom'));
const JoinGame = lazy(() => import('./components/setup/JoinGame'));
const Room = lazy(() => import('./components/setup/Room'));

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/generate" component={GenerateRoom} exact />
            <Route path="/join" component={JoinGame} exact />
            <Route path="/game/:code" component={Room}/>
          </Switch>
        </Suspense>
      </header>
    </div>
  );
}

export default App;
