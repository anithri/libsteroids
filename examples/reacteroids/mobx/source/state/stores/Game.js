import MobX, {action, observable} from 'mobx'

export default class Game
{
  @observable events = []

  @observable level = 1

  @observable score = 0

  @observable shipCount = 0

  @action setEvents = events => this.events.replace(events)

  @action setLevel = level => this.level = level

  @action setScore = score => this.score = score

  @action setShipCount = shipCount => this.shipCount = shipCount
}
