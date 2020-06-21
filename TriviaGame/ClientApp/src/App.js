import React, { Suspense, lazy, useState, useEffect, useContext } from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import Loading from "./components/Loading";
import { UserContext, HubConnectionContext } from "./Context";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const Home = lazy(() => import('./components/Home'));
const GenerateRoom = lazy(() => import('./components/setup/GenerateRoom'));
const JoinGame = lazy(() => import('./components/setup/JoinGame'));
const Room = lazy(() => import('./components/setup/Room'));
const Game = lazy(() => import('./components/Game'));

const useStyles = makeStyles(theme => ({
  homeButton: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      color: 'white',
    },
}));

function App(props) {
  const classes = useStyles();
  const [currName, setCurrName] = useState('');
  const { executeCommand } = useContext(HubConnectionContext);

  useEffect(() => {
    const init = async () => {
      console.log('initializing')
      await executeCommand('start');
    }
    init();
  }, []);

  const goHome = async (e, rightclick) => {
    e.preventDefault();
    if (rightclick) {
      window.open("http://localhost:3000/")
    } else {
      try {
        await executeCommand('end');
      } catch (err) {
        console.log(err);
      }
      props.history.push(`/`);
      window.location.reload();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <IconButton aria-label="go home and be a family guy" onClick={(e) => {goHome(e, 0)}} onContextMenu={(e) => {goHome(e, 1)}} className={classes.homeButton}>
        <HomeIcon />
      </IconButton>
      <UserContext.Provider value={{currName,saveUser: (name) => setCurrName(name)}}>
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

export default withRouter(App);
