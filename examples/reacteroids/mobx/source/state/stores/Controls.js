import MobX, {action, observable} from 'mobx'

export default class Controls
{
  @observable
  accelerating = false

  @observable
  hyperspace = false

  @observable
  rotatingLeft = false

  @observable
  rotatingRight = false

  @observable
  shooting = false

  @action
  setAccelerating(accelerating)
  {
    this.accelerating = accelerating
  }

  @action
  setHyperspace(hyperspace)
  {
    this.hyperspace = hyperspace
  }

  @action
  setRotatingLeft(rotatingLeft)
  {
    this.rotatingLeft = rotatingLeft
  }

  @action
  setRotatingRight(rotatingRight)
  {
    this.rotatingRight = rotatingRight
  }

  @action setShooting(shooting)
  {
    this.shooting = shooting
  }
}
