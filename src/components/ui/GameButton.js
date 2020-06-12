import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';

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
        width: '100%'
    },
    questionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle at center, rgb(2, 204, 204) 0%, rgba(255,255,255,1) 100%)",
    },
    disabledQuestionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle at center, rgb(2, 204, 204) 0%, rgba(255,255,255,0.5) 100%)",
    },
    correctQuestionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle at center, green 0%, rgba(255,255,255,1) 100%)",
    },
    wrongQuestionCard: {
        height: '150px',
        width: '100%',
        background: "radial-gradient(circle at center, red 0%, rgba(255,255,255,1) 100%)",
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
            <Card className={cardClass}>
                <Button className={classes.questionText} onClick={(e) => onClick(e)}>{buttonText}</Button>
            </Card>
        </div>
    );
}

export default GameButton;