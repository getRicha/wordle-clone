import './App.css';
import Board from './components/Board';
import { boardDefault, generateWordSet } from './words';
import Keyboard from './components/Keyboard';
import {createContext, useEffect, useState} from 'react';
import GameOver from "./components/GameOver";

// context API lets us pass data through the component tree without having to pass props down manually at every level
// layman's way of saying: "I want to pass this data down to all of my children"
// we can use the useContext hook to access the context
export const AppContext = createContext();

//access to both the states anywhere under the provider 
function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt:0, letterPos:0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver:false, winner:false})
  const [corrWord, setCorrWord] = useState("")

  useEffect(() => {
    generateWordSet().then(words => {
      setWordSet(words.wordSet);
      setCorrWord(words.todaysWord);
    })
  }, [])

  const onDelete = () => {
    if(currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos-1] = ""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos:currAttempt.letterPos-1})
  };
  const onEnter = () => {
    if(currAttempt.letterPos !== 5) return;

    let currWord = ""
    for(let i=0;i<5;i++){
      currWord += board[currAttempt.attempt][i]
    }
    currWord += '\r'
    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt:currAttempt.attempt+1, letterPos:0});
    }else{
      alert('Word not found');
    }
    if(currWord === corrWord){
      setGameOver({gameOver:true, winner:true})
      return;
    }
    if(currAttempt.attempt === 5){
      setGameOver({gameOver:true, winner:false})
      return;
    }
  };
  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({attempt:currAttempt.attempt, letterPos: currAttempt.letterPos + 1})
  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
       value={{
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onEnter, 
        onDelete, 
        onSelectLetter, 
        corrWord, 
        disabledLetters, 
        setDisabledLetters,
        gameOver, 
        setGameOver
      }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
