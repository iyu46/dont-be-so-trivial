import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Paper } from '@material-ui/core';

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
    questionText: {
        height: '100%',
        width: '100%',
        color: "white",
        borderRadius: '0px',
        textShadow: '0px 0px 5px black',
        fontSize: '0.925rem',
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    questionCard: {
        height: '150px',
        width: '100%',
        background: "linear-gradient(90deg, rgba(3,252,248,1) 0%, rgba(0,138,251,1) 100%)",
    },
    disabledQuestionCard: {
        height: '150px',
        width: '100%',
        background: "linear-gradient(90deg, rgba(3,252,248,1) 0%, rgba(0,138,251,1) 100%)",
    },
    correctQuestionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle, rgb(3,252,48,1) 0%, rgba(0,88,33,1) 100%)",
    },
    wrongQuestionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle, rgba(248,3,3,1) 0%, rgba(88,0,0,1) 100%)",
    },
}));

function GameButton(props) {
    const classes = useStyles();
    const buttonText = props.buttonText;
    const buttonIndex = props.buttonIndex;
    var correctAnswer = props.correctAnswer;
    var showAnswer = props.showAnswer;
    const [selected, setSelected] = useState(false);
    const [cardClass, setCardClass] = useState();

    const determineCardClass = () => {
        if (showAnswer && correctAnswer === buttonIndex) {
            setCardClass(classes.correctQuestionCard);
        } else if (showAnswer && selected && (buttonIndex !== correctAnswer)) {
            setCardClass(classes.wrongQuestionCard);
        } else if (showAnswer && !selected) {
            setCardClass(classes.disabledQuestionCard);
        } else {
            setCardClass(classes.questionCard);
        }
    }

    // useEffect( () => {
    //     const determineCardClass = () => {
    //         console.log(props)
    //         console.log(selected)
    //         if (showAnswer && correctAnswer === buttonIndex) {
    //             setCardClass(classes.correctQuestionCard);
    //         } else if (showAnswer && selected && (buttonIndex !== correctAnswer)) {
    //             setCardClass(classes.wrongQuestionCard);
    //         } else {
    //             setCardClass(classes.questionCard);
    //         }
    //     }
    //     if (selected) {
    //         determineCardClass();
    //         setSelected(false);
    //     }
    // }, [selected])

    const onClick = (e) => {
        if (showAnswer) return;
        setSelected(true);
        props.onClick();
        determineCardClass();
    }

    useEffect(() => {
        determineCardClass();
    });

    useEffect(() => {
        if (correctAnswer === -1) {
            setSelected(false);
        }
    }, [correctAnswer]);

    return (
        <div>
            <Paper className={cardClass}>
                <Button className={classes.questionText} onClick={(e) => onClick(e)}>{buttonText}</Button>
            </Paper>
        </div>
    );
}

export default GameButton;