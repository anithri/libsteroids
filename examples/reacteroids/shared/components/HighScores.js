import 'css/HighScores.css'
import React from 'react'

const HighScores = ({highScores, showMainMenu}) =>
{
  const numbers = []
  const names = []
  const scores = []
  let number = 0

  while (number++ < 10)
  {
    numbers.push(`${number}.`)

    if (number < 10)
      numbers.push(<br key={number} />)
  }

  highScores.forEach((highScore, index) =>
  {
    names.push(highScore.username)

    if (index < 9)
      names.push(<br key={index} />)

    scores.push(highScore.score)

    if (index < 9)
      scores.push(<br key={index} />)
  })

  return (
    <high-scores class="centered">
      <numbers>
        <h2>&nbsp;</h2>
        {numbers}
      </numbers>
      <names>
        <h2>NAME</h2>
        {names}
      </names>
      <scores>
        <h2>SCORE</h2>
        {scores}
      </scores>
      <button autoFocus onClick={showMainMenu}>MAIN MENU</button>
    </high-scores>
  )
}

export default HighScores
