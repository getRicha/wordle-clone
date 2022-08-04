import './App.css';
import Board from './components/Board';
import { boardDefault } from './words';
import Keyboard from './components/Keyboard';
import {createContext, useState} from 'react';

// context API lets us pass data through the component tree without having to pass props down manually at every level
// layman's way of saying: "I want to pass this data down to all of my children"
// we can use the useContext hook to access the context
export const AppContext = createContext();

//access to both the states anywhere under the provider 
function App() {
  const [board, setBoard] = useState(boardDefault)
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
