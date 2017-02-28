import {Directive, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({selector: 'controls'})
export class Controls
{
  @Output()
  private onChange:EventEmitter<any> = new EventEmitter()

  private keys:Set<string> = new Set(['ArrowUp', 'w', 'ArrowLeft', 'a', 'ArrowRight', 'd', 'Shift', ' '])

  private keysDown:Set<string> = new Set<string>()

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event:KeyboardEvent)
  {
    if (this.keys.has(event.key)
    && !this.keysDown.has(event.key))
    {
      this.keysDown.add(event.key)
      this.handleKeyChange(event.key)
    }
  }

  @HostListener('window:keyup', ['$event'])
  private handleKeyUp(event:KeyboardEvent)
  {
    if (this.keys.has(event.key)
    && this.keysDown.has(event.key))
    {
      this.keysDown.delete(event.key)
      this.handleKeyChange(event.key)
    }
  }

  private handleKeyChange(key:string)
  {
    switch (key)
    {
      case 'ArrowUp':
      case 'w':
        this.onChange.emit({accelerating: this.keysDown.has('ArrowUp') || this.keysDown.has('w')})
        break

      case 'ArrowLeft':
      case 'a':
        this.onChange.emit({rotatingLeft: this.keysDown.has('ArrowLeft') || this.keysDown.has('a')})
        break

      case 'ArrowRight':
      case 'd':
        this.onChange.emit({rotatingRight: this.keysDown.has('ArrowRight') || this.keysDown.has('d')})
        break

      case 'Shift':
        this.onChange.emit({hyperspace: this.keysDown.has('Shift')})
        break

      case ' ':
        this.onChange.emit({shooting: this.keysDown.has(' ')})
        break
    }
  }
}
