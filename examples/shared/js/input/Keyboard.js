const handleKeyEvent = ({keyCode, type}) =>
{
  if (keyListeners.has(keyCode))
  {
    if (type === 'keydown'
    && !keysDown.has(keyCode))
    {
      keysDown.add(keyCode)
      keyListeners.get(keyCode)(true, keyCode)
    }

    else if (type === 'keyup'
    && keysDown.has(keyCode))
    {
      keysDown.delete(keyCode)
      keyListeners.get(keyCode)(false, keyCode)
    }
  }
}

const keyListeners = new Map()

const keysDown = new Set()

export const addKeyListener = (keyCode, listener) => keyListeners.set(keyCode, listener)

export const removeKeyListener = keyCode => keyListeners.delete(keyCode)

window.addEventListener('keyup', handleKeyEvent)

window.addEventListener('keydown', handleKeyEvent)
