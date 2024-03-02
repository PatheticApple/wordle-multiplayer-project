import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useState, useEffect } from 'react';
import { boardDefault } from './components/Words';
import { generateWordSet } from './components/Words';
export const AppContext = createContext();


function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const correctWord = "RIGHT";
  const [disabledLetters, setDisabledLetters] = useState([])

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return; // Don't continue with the function
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;


    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i]
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
    }
    else {
      alert("Word Not Found")
    }

    if (currentWord === correctWord) {
      alert("Game ended. You won!")
    }
  }
  return (
    <div className="App">
      <nav>
        <h1>
          Wordle
        </h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt, 
        onDelete, 
        onEnter, 
        onSelectLetter, 
        correctWord, 
        disabledLetters,
        setDisabledLetters
      }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>

    </div>
  );
}

export default App;
