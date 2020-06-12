import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
}));

function Quickstarter(props) {
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);

    const handleClick = (item) => {
        if (item === questions[currQuestion].correct_answer) {
            console.log("correct");
            // TODO: Send to server to record points
        } else {
            console.log("incorrect");
        }
        // TODO: This will need to be set either on a countdown or when all answers have been received from the players
        if (currQuestion < questions.length - 1) {
            setCurrQuestion(currQuestion + 1);
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
    useEffect(() => {
        populateDisplayQuestions();
    }, []);

    return (
        <div>
            { questions.length > 0 ?
            <div>
                { questions[currQuestion].question }
                {questions[currQuestion].answers.map((ans, i) => {
                    return (
                        <Button variant="contained" key={i} onClick={() => handleClick(ans)}>{ans}</Button>
                    )
                })}
                </div>
            : ''}
        </div>
    );
}

export default Quickstarter;