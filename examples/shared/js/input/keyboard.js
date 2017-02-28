const handleKeyEvent = ({keyCode, type}) =>
{
  if (keyListeners.has(keyCode))
  {
    if (type === 'keydown'
    && !keysDown.has(keyCode))
    {
      keysDown.add(keyCode)
      keyListeners.get(keyCode)(keyCode, true)
    }

    else if (type === 'keyup'
    && keysDown.has(keyCode))
    {
      keysDown.delete(keyCode)
      keyListeners.get(keyCode)(keyCode, false)
    }
  }
}

const addKeyListener = (keyCode, listener) => keyListeners.set(keyCode, listener)

const removeKeyListener = keyCode =>
{
  keyListeners.delete(keyCode)

  if (keysDown.has(keyCode))
    keysDown.delete(keyCode)
}

const keyListeners = new Map()

const keysDown = new Set()

window.addEventListener('keyup', handleKeyEvent)

window.addEventListener('keydown', handleKeyEvent)

export {addKeyListener, removeKeyListener, keysDown}
