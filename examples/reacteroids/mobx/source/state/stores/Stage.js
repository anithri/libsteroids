import MobX, {action, observable} from 'mobx'

export default class Stage
{
  @observable width = window.innerWidth

  @observable height = window.innerHeight

  @observable particles = []

  @observable polygons = []

  @action resize = () => Object.assign(this, {width: window.innerWidth, height: window.innerHeight})

  @action setParticles = particles => this.particles.replace(particles)

  @action setPolygons = polygons => this.polygons.replace(polygons)
}
