import {Directive, Input} from '@angular/core'
import {Howl} from 'howler'
import {Event} from 'libsteroids-engine'
import {State} from 'interfaces'

const MAX_BEAT_DELAY:number = 1000
const MIN_BEAT_DELAY:number = 300

const EventType:any= {}

Object.keys(Event).forEach((key:string) => EventType[key] = key)

@Directive({selector: 'sounds'})
export class Sounds
{
  @Input()
  private events:string[]

  private beatTone1:Howl = new Howl({src:['./beatTone1.wav'], preload:true})

  private beatTone2:Howl = new Howl({src:['./beatTone2.wav'], preload:true})

  private explosionLarge:Howl = new Howl({src:['./explosionLarge.wav'], preload:true})

  private explosionMedium:Howl = new Howl({src:['./explosionMedium.wav'], preload:true})

  private explosionSmall:Howl = new Howl({src:['./explosionSmall.wav'], preload:true})

  private saucerLarge:Howl = new Howl({src:['./saucerLarge.wav'], loop:true, preload:true})

  private saucerSmall:Howl = new Howl({src:['./saucerSmall.wav'], loop:true, preload:true})

  private shot:Howl = new Howl({src:['./shot.wav'], preload:true})

  private spawn:Howl = new Howl({src:['./spawn.wav'], preload:true})

  private thrust:Howl = new Howl({src:['./thrust.wav'], autoplay: true, loop: true, preload:true, volume:0})

  private beatPlaying:boolean = false

  private beatDelay:number = 1000

  private currentBeatTone:number = 1

  constructor()
  {
    this.playBeat()
  }

  private playBeat():void
  {
    this.beatDelay = MAX_BEAT_DELAY
    this.beatPlaying = true
    this.playBeatTone()
  }

  private stopBeat():void
  {
    this.beatPlaying = false
  }

  private playBeatTone():void
  {
    if (this.beatPlaying)
    {
      this.currentBeatTone === 1 ? this.beatTone1.play() : this.beatTone2.play()

      if (++this.currentBeatTone === 3)
        this.currentBeatTone = 1

      setTimeout(() => this.playBeatTone(), this.beatDelay)

      if (this.beatDelay > MIN_BEAT_DELAY)
        this.beatDelay -= 10
    }
  }

  private ngOnChanges(changes:any):void
  {
    const events:string[] = changes.events.currentValue

    if (events
    && events.length > 0)
    {
      if (events.includes(EventType.NewLevel))
        this.beatDelay = MAX_BEAT_DELAY

      if (events.includes(EventType.ShipSpawn))
        this.spawn.play()

      if (events.includes(EventType.ShipThrustStart))
        this.thrust.fade(0, 1, 250)

      if (events.includes(EventType.ShipThrustStop))
        this.thrust.fade(this.thrust.volume(), 0, 500)

      if (events.includes(EventType.Shot))
        this.shot.play()

      if (events.includes(EventType.SaucerSmallSpawn))
        this.saucerSmall.play()

      if (events.includes(EventType.SaucerLargeSpawn))
        this.saucerLarge.play()

      if (events.includes(EventType.SaucerRemoved))
      {
        if (this.saucerLarge.playing())
          this.saucerLarge.stop()

        if (this.saucerSmall.playing())
          this.saucerSmall.stop()
      }

      if (events.includes(EventType.ExplosionLarge))
        this.explosionLarge.play()

      if (events.includes(EventType.ExplosionMedium))
        this.explosionMedium.play()

      if (events.includes(EventType.ExplosionSmall))
        this.explosionSmall.play()
    }
  }

  private ngOnDestroy():void
  {
    this.stopBeat()

    if (this.saucerLarge.playing())
      this.saucerLarge.stop()

    if (this.saucerSmall.playing())
      this.saucerSmall.stop()

    if (this.thrust.volume() > 0)
      this.thrust.volume(0)
  }
}
