import 'css/MainMenu.css'
import React from 'react'

const MainMenu = ({showHighScores, startGame}) => (
  <main-menu class="centered">
    <h1>REACTEROIDS</h1>
    <button onClick={startGame} autoFocus>PLAY GAME</button>
    <button onClick={showHighScores}>HIGH SCORES</button>
  </main-menu>
)

export default MainMenu
