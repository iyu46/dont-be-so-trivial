import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, Typography } from '@material-ui/core';
import { getTriviaQuestions, getCategoryOptions, checkAnswer } from '../../Helper';
import GameButton from '../ui/GameButton';

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

function Quickstarter(props) {
    const classes = useStyles();
    const [questionsReady, setQuestionsReady] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

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

    useEffect(() => {
        const populateDisplayQuestions = async () => {
            var response = await getTriviaQuestions({ category: "Entertainment", numQuestions: 4, difficulty: "easy" });
            console.log(response)
            setQuestions(response);
            setQuestionsReady(true);
        }
        if (!questionsReady) {
            populateDisplayQuestions()
        }
    }, [questionsReady]);

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