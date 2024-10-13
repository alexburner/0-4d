import { FC } from 'react'
import { useHash } from 'react-use'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { Stacks } from './routes/Stacks'
import { TorusTest } from './routes/TorusTest'
import { TrailColumns } from './routes/TrailColumns'
import { Trails } from './routes/Trails'
import { TrailsCombined } from './routes/TrailsCombined'
import { TrailsCombinedIntro } from './routes/TrailsCombinedIntro'
import { TrailsSurface } from './routes/TrailsSurface'
import { parseHashRoute } from './util/hashRoute'

export const App: FC = () => {
  const [hash] = useHash()
  const route = parseHashRoute(hash)
  switch (route.path) {
    case '':
      return <Home />
    case 'trails':
      return <Trails route={route} />
    case 'trail-columns':
      return <TrailColumns route={route} />
    case 'trails-combined':
      return <TrailsCombined route={route} />
    case 'trails-combined-intro':
      return <TrailsCombinedIntro route={route} />
    case 'trails-surface':
      return <TrailsSurface route={route} />
    case 'stacks':
      return <Stacks route={route} />
    case 'torus-test':
      return <TorusTest />
    default:
      return <NotFound route={route} />
  }
}
