import 'ui/MainMenu.css'
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showHighScores} from 'state/Application'
import {startGame} from 'state/State'

const MainMenu = ({showHighScores}) => (
  <div className="centered-overlay menu">
    <h1>REACTEROIDS</h1>
    <button onClick={startGame} autoFocus>PLAY GAME</button>
    <button onClick={showHighScores}>HIGH SCORES</button>
  </div>
)

export default connect(null, dispatch => bindActionCreators({showHighScores}, dispatch))(MainMenu)
