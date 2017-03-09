import {Directive, EventEmitter, HostListener, Output} from '@angular/core'
import {GameControlKey} from 'libsteroids-examples-shared/js/constants'

@Directive({selector: 'controls'})
export class Controls
{
  @Output()
  private onChange:EventEmitter<any> = new EventEmitter()

  private keyCodes:Set<number> = new Set(Object.values(GameControlKey))

  private keysDown:Set<number> = new Set<number>()

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event:KeyboardEvent)
  {
    if (this.keyCodes.has(event.keyCode)
    && !this.keysDown.has(event.keyCode))
    {
      this.keysDown.add(event.keyCode)
      this.handleKeyChange(event.keyCode)
    }
  }

  @HostListener('window:keyup', ['$event'])
  private handleKeyUp(event:KeyboardEvent)
  {
    if (this.keyCodes.has(event.keyCode)
    && this.keysDown.has(event.keyCode))
    {
      this.keysDown.delete(event.keyCode)
      this.handleKeyChange(event.keyCode)
    }
  }

  private handleKeyChange(keyCode:number)
  {
    switch (keyCode)
    {
      case GameControlKey.ArrowUp:
      case GameControlKey.w:
        this.onChange.emit({accelerating: this.keysDown.has(GameControlKey.ArrowUp) || this.keysDown.has(GameControlKey.w)})
        break

      case GameControlKey.ArrowLeft:
      case GameControlKey.a:
        this.onChange.emit({rotatingLeft: this.keysDown.has(GameControlKey.ArrowLeft) || this.keysDown.has(GameControlKey.a)})
        break

      case GameControlKey.ArrowRight:
      case GameControlKey.d:
        this.onChange.emit({rotatingRight: this.keysDown.has(GameControlKey.ArrowRight) || this.keysDown.has(GameControlKey.d)})
        break

      case GameControlKey.Shift:
        this.onChange.emit({hyperspace: this.keysDown.has(GameControlKey.Shift)})
        break

      case GameControlKey.Space:
        this.onChange.emit({shooting: this.keysDown.has(GameControlKey.Space)})
        break
    }
  }
}
