import 'css/MainMenu.css'
import React from 'react'

const MainMenu = ({showHighScores, startGame}) => (
  <div className="centered-overlay menu">
    <h1>REACTEROIDS</h1>
    <button onClick={startGame} autoFocus>PLAY GAME</button>
    <button onClick={showHighScores}>HIGH SCORES</button>
  </div>
)

export default MainMenu
