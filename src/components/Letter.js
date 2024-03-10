import React , {useContext, useEffect} from "react";
import { boardDefault } from "./Words";
import App, { AppContext } from "../App";


function Letter({ letterPos, attemptVal}) {
    const {board, correctWord, currAttempt, disabledLetters, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    const letterState = currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");
    

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => {
                return [...prev, letter]
            });
        }
    }, [currAttempt.attempt])
    return (
        <div className="letter" id={letterState}>{letter}</div>
    );
}

function EmptyLetter() {
    
    return (
        <div className="letter"></div>
    );
}

export default Letter ; 