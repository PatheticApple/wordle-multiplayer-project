import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/Gameover';
import { createContext, useState, useEffect } from 'react';
import { boardDefault } from './components/Words';
import { generateWordSet } from './components/Words';
import 'bootstrap/dist/css/bootstrap.css';


import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import Login from './components/Login';
import SignUp from './components/SignUp';


export const AppContext = createContext();


function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false });
  const [numberofPlayer, setNumberofPlayer] = useState(2);


  const [isAuth, setIsAuth] = useState(false);
  const cookies = new Cookies();
  const api_key = "2egf5xeqcuhe"
  const client = StreamChat.getInstance(api_key)
  const token = cookies.get("token");


  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  }

  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    },
      token
    ).then((user) => {
      console.log(user);
      setIsAuth(true);
    })

  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      console.log(words.correctWord);
      setCorrectWord(words.correctWord);
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

    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      console.log("ITs over")
    }

    if (currAttempt.attempt == 5) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }
  return (
    
    <div className="App">
    {isAuth ? (
      <div>
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
        setDisabledLetters,
        gameOver,
        setGameOver
      }}>
        <div className='row'>
          <div className='col-6'>
            <div className='game'>
              <Board mainPlayer={true} />
              <div className='m-2'>
              {gameOver.gameOver ? <GameOver /> : <Keyboard />}
              </div>
            </div>
          </div>
          <div className='col-6 d-flex flex-wrap'>
            <div className='game2'>
              <Board playerName={"Player 1"} />
            </div>
            <div className='game2'>
              <Board playerName={"Player 2"} />
            </div>
            <div className='game2'>
              <Board playerName={"Player 3"} />
            </div>
            <div className='game2'>
              <Board playerName={"Player 4"} />
            </div>

          </div>
          <button onClick={logOut}>Log out</button>
        </div>


      </AppContext.Provider>
      </div>
    ) : (
      <>
      <Login setIsAuth={setIsAuth} />
      <SignUp setIsAuth={setIsAuth} />
      </>
    )}

    </div>
  );
}

export default App;
