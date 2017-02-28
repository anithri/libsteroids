import React, {Component} from 'react'
import {Howl} from 'howler'
import {Event} from 'libsteroids-engine'

const MAX_BEAT_DELAY = 1000
const MIN_BEAT_DELAY = 300

const EventType = {}

Object.keys(Event).forEach(key => EventType[key] = key)

export default class Sounds extends Component
{
  beatTone1 = new Howl({src:['./beatTone1.wav'], preload:true})

  beatTone2 = new Howl({src:['./beatTone2.wav'], preload:true})

  explosionLarge = new Howl({src:['./explosionLarge.wav'], preload:true})

  explosionMedium = new Howl({src:['./explosionMedium.wav'], preload:true})

  explosionSmall = new Howl({src:['./explosionSmall.wav'], preload:true})

  saucerLarge = new Howl({src:['./saucerLarge.wav'], loop:true, preload:true})

  saucerSmall = new Howl({src:['./saucerSmall.wav'], loop:true, preload:true})

  shot = new Howl({src:['./shot.wav'], preload:true})

  spawn = new Howl({src:['./spawn.wav'], preload:true})

  thrust = new Howl({src:['./thrust.wav'], loop: true, preload:true, volume:0})

  beatPlaying = false

  beatDelay = 1000

  currentBeatTone = 1

  startBeat()
  {
    this.beatPlaying = true
    this.beatDelay = MAX_BEAT_DELAY
    this.playBeatTone()
  }

  stopBeat()
  {
    this.beatPlaying = false
  }

  playBeatTone()
  {
    if (this.beatPlaying)
    {
      this.currentBeatTone === 1 ? this.beatTone1.play() : this.beatTone2.play()

      if (++this.currentBeatTone === 3)
        this.currentBeatTone = 1

      setTimeout(this.playBeatTone, this.beatDelay)

      if (this.beatDelay > MIN_BEAT_DELAY)
        this.beatDelay -= 10
    }
  }

  componentWillMount()
  {
    this.startBeat()
    this.thrust.play()
  }

  render()
  {
    const {events} = this.props

    if (events.length === 0)
      return null

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

    return null
  }

  componentWillUnmount()
  {
    this.explosionLarge.play()

    if (this.saucerLarge.playing())
      this.saucerLarge.stop()

    if (this.saucerSmall.playing())
      this.saucerSmall.stop()

    this.thrust.stop()

    if (this.thrust.volume() > 0)
      this.thrust.volume(0)

    this.stopBeat()
  }
}
