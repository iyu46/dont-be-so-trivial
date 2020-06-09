import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import data from './api.json';

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

// Returns an integer random number between min (included) and max (included):
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function Quickstarter(props) {
    const classes = useStyles();
    const [questions, setQuestions] = useState(data.results);
    const displayQuestions = [];

    const handleClick = (item) => {
        if (item === displayQuestions[0].correct_answer) {
            console.log("correct");
        } else {
            console.log("incorrect");
        }
    }

    // const fakeFetchQuestions = () => {
    //     try {
    //         import('./api.json').then(query => {
    //             setQuestions(query);
    //         });
    //     } catch(err) {};
    // }

    const populateDisplayQuestions = () => {
        var startingIndex = randomInteger(0, 9); // generate index between 0 - 9
        displayQuestions[0] = questions[startingIndex];
        if (questions[startingIndex].incorrect_answers.length === 3) {
            var randomInsertIndex = randomInteger(0, 2);
            displayQuestions[0].answers = displayQuestions[0].incorrect_answers;
            displayQuestions[0].answers.splice(randomInsertIndex, 0, displayQuestions[0].correct_answer);
        }
    }

    populateDisplayQuestions();

    return (
        <div>
                {displayQuestions[0].question}
                {displayQuestions[0].answers.map( (item) => {
                    return (
                        <Button variant="contained" onClick={() => handleClick(item)}>{item}</Button>
                )})}
                {displayQuestions[0].correct_answer}
        </div>
    );
}

export default Quickstarter;