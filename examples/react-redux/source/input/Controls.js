import {addKeyListener} from './Keyboard'

const KEY = {
  UP: 38,
  RIGHT: 39,
  LEFT:  37,
  W: 87,
  D: 68,
  A: 65,
  SPACE: 32,
  SHIFT: 16
}

export default class Controls
{
  accelerating = false

  rotatingLeft = false

  rotatingRight = false

  shooting = false

  _hyperspace = false

  get hyperspace()
  {
    if (this._hyperspace)
    {
      this._hyperspace = false

      return true
    }

    return false
  }

  keysDown = new Set()

  constructor()
  {
    Object.values(KEY).forEach(keyCode => addKeyListener(keyCode, this.handleKeyEvent))
  }

  handleKeyEvent = (pressed, keyCode) =>
  {
    const {keysDown} = this

    if (pressed)
      keysDown.add(keyCode)

    else
      keysDown.delete(keyCode)

    switch (keyCode)
    {
      case KEY.UP:
      case KEY.W:
        this.accelerating = keysDown.has(KEY.UP) || keysDown.has(KEY.W)
        break

      case KEY.RIGHT:
      case KEY.D:
        this.rotatingRight = keysDown.has(KEY.RIGHT) || keysDown.has(KEY.D)
        break

      case KEY.LEFT:
      case KEY.A:
        this.rotatingLeft = keysDown.has(KEY.LEFT) || keysDown.has(KEY.A)
        break

      case KEY.SPACE:
        this.shooting = keysDown.has(KEY.SPACE)
        break

      case KEY.SHIFT:
        this._hyperspace = keysDown.has(KEY.SHIFT)
        break
    }
  }
}
