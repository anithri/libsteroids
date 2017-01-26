import 'ui/MainMenu.css'
import React from 'react'
import {inject, observer} from 'mobx-react'

const MainMenu = ({showHighScores, startGame}) => (
  <div className="centered-overlay menu">
    <h1>REACTEROIDS</h1>
    <button onClick={startGame} autoFocus>PLAY GAME</button>
    <button onClick={showHighScores}>HIGH SCORES</button>
  </div>
)

export default inject(({showHighScores, startGame}) => ({showHighScores, startGame}))(observer(MainMenu))
