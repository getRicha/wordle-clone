import React, {useContext} from "react";
import {AppContext} from '../App';

function GameOver(){
    const {gameOver, currAttempt, corrWord} = useContext(AppContext);
    return (
        <div className="gameOver">
            <h3>{gameOver.winner ? "Winner" : "Loser"}</h3>
            <h1>Correct: {corrWord}</h1>
            {gameOver.winner && (
                <h3>You guessed in {currAttempt.attempt} attempts</h3>
            )}
        </div>
    )
}

export default GameOver;