import 'assets/beatTone1.wav'
import 'assets/beatTone2.wav'
import 'assets/explosionLarge.wav'
import 'assets/explosionMedium.wav'
import 'assets/explosionSmall.wav'
import 'assets/saucerLarge.wav'
import 'assets/saucerSmall.wav'
import 'assets/shot.wav'
import 'assets/spawn.wav'
import 'assets/thrust.wav'
import {connect} from 'preact-redux'
import {Howl} from 'howler'
import * as EVENT from 'engine/Event'

const MAX_BEAT_DELAY = 1000
const MIN_BEAT_DELAY = 300

const beatTone1 = new Howl({src:['/beatTone1.wav'], preload:true})
const beatTone2 = new Howl({src:['/beatTone2.wav'], preload:true})
const explosionLarge = new Howl({src:['/explosionLarge.wav'], preload:true})
const explosionMedium = new Howl({src:['/explosionMedium.wav'], preload:true})
const explosionSmall = new Howl({src:['/explosionSmall.wav'], preload:true})
const saucerLarge = new Howl({src:['/saucerLarge.wav'], loop:true, preload:true})
const saucerSmall = new Howl({src:['/saucerSmall.wav'], loop:true, preload:true})
const shot = new Howl({src:['/shot.wav'], preload:true})
const spawn = new Howl({src:['/spawn.wav'], preload:true})
const thrust = new Howl({src:['/thrust.wav'], autoplay: true, loop: true, preload:true, volume:0})

const playBeat = () =>
{
  beatPlaying = true
  beatDelay = MAX_BEAT_DELAY
  playBeatTone()
}

const stopBeat = () => beatPlaying = false

const playBeatTone = () =>
{
  if (beatPlaying)
  {
    currentBeatTone === 1 ? beatTone1.play() : beatTone2.play()

    if (++currentBeatTone === 3)
      currentBeatTone = 1

    setTimeout(playBeatTone, beatDelay)

    if (beatDelay > MIN_BEAT_DELAY)
      beatDelay -= 10
  }
}

let beatPlaying = false
let beatDelay = 1000
let currentBeatTone = 1

const Audio = ({events}) =>
{
  if (events.includes(EVENT.GAME_START))
    playBeat()

  if (events.includes(EVENT.GAME_END))
  {
    stopBeat()

    if (saucerLarge.playing())
      saucerLarge.stop()

    if (saucerSmall.playing())
      saucerSmall.stop()

    if (thrust.volume() > 0)
      thrust.volume(0)
  }

  if (events.includes(EVENT.NEW_LEVEL))
    beatDelay = MAX_BEAT_DELAY

  if (events.includes(EVENT.SHIP_SPAWN))
    spawn.play()

  if (events.includes(EVENT.SHIP_THRUST_START))
    thrust.fade(0, 1, 250)

  if (events.includes(EVENT.SHIP_THRUST_STOP))
    thrust.fade(thrust.volume(), 0, 500)

  if (events.includes(EVENT.SHOT))
    shot.play()

  if (events.includes(EVENT.SAUCER_SMALL_SPAWN))
    saucerSmall.play()

  if (events.includes(EVENT.SAUCER_LARGE_SPAWN))
    saucerLarge.play()

  if (events.includes(EVENT.SAUCER_REMOVED))
  {
    if (saucerLarge.playing())
      saucerLarge.stop()

    if (saucerSmall.playing())
      saucerSmall.stop()
  }

  if (events.includes(EVENT.EXPLOSION_LARGE))
    explosionLarge.play()

  if (events.includes(EVENT.EXPLOSION_MEDIUM))
    explosionMedium.play()

  if (events.includes(EVENT.EXPLOSION_SMALL))
    explosionSmall.play()

  return null
}

export default connect(({game}) => ({events:game.events}))(Audio)
