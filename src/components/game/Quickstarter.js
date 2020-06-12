import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, Typography } from '@material-ui/core';
import { getTriviaQuestions } from '../../Helper';

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
        height: 150
    },
    questionCard: {
        height: '100%',
        width: '100%',
    },
    questionText: {
        height: '100%',
        width: '100%'
    },
    correctQuestionCard: {
        height: '100%',
        width: '100%',
        backgroundColor: 'green'
    }
}));

function decodeEntities(text) {
    var str = decodeURIComponent(text).replace("%2C", ",");

    return str;
}

function Quickstarter(props) {
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

    const handleClick = (ansIndex) => {
        setShowAnswer(true);
        setCorrectAnswer((questions[currQuestion].answers.indexOf(decodeEntities(questions[currQuestion].correct_answer))));

        // console.table(questions);
        // console.log("currque:" + currQuestion);
        console.log("correct:" + correctAnswer);
        console.log("question: " + decodeEntities(questions[currQuestion].answers[ansIndex]));
        console.log("answer: " + decodeEntities(questions[currQuestion].correct_answer));

        if (decodeEntities(questions[currQuestion].answers[ansIndex]) === decodeEntities(questions[currQuestion].correct_answer)) {
            console.log("correct");
            // TODO: Send to server to record points
        } else {
            console.log("incorrect");
        }
        // TODO: This will need to be set either on a countdown or when all answers have been received from the players
        if (currQuestion < questions.length - 1) {
            setTimeout(() => {
                setShowAnswer(false);
                setCorrectAnswer(-1);
                setCurrQuestion(currQuestion + 1);
            }, 3000);
        }
        
    }

    const populateDisplayQuestions = async () => {
        var response = await getTriviaQuestions({ numQuestions: 4 });
        console.log(response)
        if (response.data.response_code !== 0) {
            // TODO: Handle error codes
            console.log('Error retrieving questions from the API');
        }
        var results = response.data.results;
        setQuestions(results);
        
    }

    /*useEffect(() => {
        const tick = setTimeout(() => {
            populateDisplayQuestions();
        }, 2000);
        //return () => clearInterval(tick)
    })*/
    useEffect(() => {
        populateDisplayQuestions();
    }, []);

    return (
        <div>
            { questions.length > 0 ?
            <>
            <div style={{ width: '100%', height: '30%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <Card className={showAnswer && correctAnswer === 0 ? classes.correctQuestionCard : classes.questionCard}>
                            <Button className={classes.questionText} onClick={() => handleClick(0)}>{questions[currQuestion].answers[0]}</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <Card className={showAnswer && correctAnswer === 1 ? classes.correctQuestionCard : classes.questionCard}>
                            <Button className={classes.questionText} onClick={() => handleClick(1)}>{questions[currQuestion].answers[1]}</Button>
                        </Card>
                        </Grid>
                </Grid>
            </div>
            <Typography variant='h4' style={{padding: 40}}>{questions[currQuestion].question}</Typography>
            <div style={{ width: '100%', height: '30%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <Card className={showAnswer && correctAnswer === 2 ? classes.correctQuestionCard : classes.questionCard}>
                            <Button className={classes.questionText} onClick={() => handleClick(2)}>{questions[currQuestion].answers[2]}</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={6} className={classes.questionGrid}>
                        <Card className={showAnswer && correctAnswer === 3 ? classes.correctQuestionCard : classes.questionCard}>
                            <Button className={classes.questionText} onClick={() => handleClick(3)}>{questions[currQuestion].answers[3]}</Button>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            </>
            : ''}
        </div>
    );
}

export default Quickstarter;