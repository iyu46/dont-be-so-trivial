import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, Typography } from '@material-ui/core';
import { getQuickstarter, getCategoryOptions, checkAnswer, categories, getQuestions } from '../../Helper';
import GameButton from '../ui/GameButton';
import { UserContext, HubConnectionContext } from "../../Context.js";

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
    questionGrid: {
    },
    questionCard: {
        height: '100%',
        width: '100%',
    },
    questionText: {
        height: '100%',
        width: '100%',
        textShadow: '0px 0px 5px black',
    }
}));

function decodeEntities(text) {
    var str = decodeURIComponent(text).replace("%2C", ",");

    return str;
}

// function getRandomArrayElements(arr, count) {
//     var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
//     while (i-- > min) {
//         index = Math.floor((i + 1) * Math.random());
//         temp = shuffled[index];
//         shuffled[index] = shuffled[i];
//         shuffled[i] = temp;
//     }
//     return shuffled.slice(min);
// }

function Quickstarter(props) {
    const classes = useStyles();
    const [peopleReadyCount, setPeopleReadyCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(-1);
    const { hubConnection, executeCommand } = useContext(HubConnectionContext);
    const { currName } = useContext(UserContext);
    const players = props.players;
    const roomCode = props.roomCode;
    const peopleNum = props.players.length;

    const handleClick = async (ansIndex) => {
        var response = await checkAnswer(questions[currQuestion].answers[ansIndex], questions[currQuestion].id);
        setCorrectAnswer((questions[currQuestion].answers.indexOf(decodeEntities(response))));
        setShowAnswer(true);

        // TODO: This will need to be set either on a countdown or when all answers have been received from the players
        if (currQuestion < questions.length - 1) {
            setTimeout(() => {
                setShowAnswer(false);
                setCorrectAnswer(-1);
                setCurrQuestion(currQuestion + 1);
            }, 3000);
        }
    }

    // useEffect(() => {
    //     const checkCanStart = async () => {
    //         if (peopleReadyCount === peopleNum) {
    //             var randomCategories = getRandomArrayElements(categories, 4);
    //             console.log(randomCategories);
    //             hubConnection.invoke('getQuickstarter', roomCode, JSON.stringify(randomCategories), "easy");
    //             console.log("invoked");
    //         }
    //     };
    //     if (players[0].name === currName) {
    //         checkCanStart();
    //     }
    //     console.log(players);
    //     console.log(peopleReadyCount);
    //     console.log(peopleNum);
    //     console.log(currName);
    // }, [peopleReadyCount]);

    useEffect(() => {
        const fetchQuestions = async () => {
            while (!hubConnection) {}
            /*try {
                hubConnection.on('getQuickstarter', async (questions) => {
                    console.log("getting quickstarter questions");
                    console.log(questions)
                    setQuestions(questions);
                });
                hubConnection.on('userReady', async () => {
                    console.log("i am ready")
                    setPeopleReadyCount(peopleReadyCount + 1);
                });
            } catch (err) {
                alert(err);
            }*/
            setQuestions(await getQuestions(roomCode));
        };
        fetchQuestions();
        //executeCommand('updateWithEvent', hubConnection);
        //hubConnection.invoke('userReady', roomCode);
    }, []);

    return (
        <div>
            { questions.length > 0 ?
            <>
            <div style={{ width: '100%', height: '30%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <GameButton correctAnswer={correctAnswer} showAnswer={showAnswer} buttonIndex={0} buttonText={questions[currQuestion].answers[0]} onClick={() => handleClick(0)}></GameButton>
                    </Grid>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <GameButton correctAnswer={correctAnswer} showAnswer={showAnswer} buttonIndex={1} buttonText={questions[currQuestion].answers[1]} onClick={() => handleClick(1)}></GameButton>
                    </Grid>
                </Grid>
            </div>
            <Typography variant='h4' style={{padding: 40}}>{questions[currQuestion].question}</Typography>
            <div style={{ width: '100%', height: '30%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <GameButton correctAnswer={correctAnswer} showAnswer={showAnswer} buttonIndex={2} buttonText={questions[currQuestion].answers[2]} onClick={() => handleClick(2)}></GameButton>
                    </Grid>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <GameButton correctAnswer={correctAnswer} showAnswer={showAnswer} buttonIndex={3} buttonText={questions[currQuestion].answers[3]} onClick={() => handleClick(3)}></GameButton>
                    </Grid>
                </Grid>
            </div>
            </>
            : ''}
        </div>
    );
}

export default Quickstarter;