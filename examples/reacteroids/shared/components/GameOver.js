import 'css/GameOver.css'
import React from 'react'

const GameOver = ({score}) => (
  <game-over>
    <score>Score: {score}</score>
    <h1 className="centered">GAME OVER</h1>
  </game-over>
)

export default GameOver
