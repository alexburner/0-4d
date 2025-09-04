import { FC } from 'react'
import { useHash } from 'react-use'
import { Index, linksByHash } from './routes/Index'
import { NotFound } from './routes/NotFound'
import { Spheres1 } from './routes/Spheres1'
import { Spheres2 } from './routes/Spheres2'
import { Stacks } from './routes/Stacks'
import { TorusTest } from './routes/TorusTest'
import { TrailColumns } from './routes/TrailColumns'
import { Trails } from './routes/Trails'
import { TrailsCombined } from './routes/TrailsCombined'
import { TrailsCombinedIntro } from './routes/TrailsCombinedIntro'
import { TrailsSurface } from './routes/TrailsSurface'
import { parseHashRoute } from './util/hashRoute'

export const Router: FC = () => {
  const [hash] = useHash()

  const link = linksByHash[hash]
  if (link) document.title = `ndim | ${link.text}`

  const route = parseHashRoute(hash)
  switch (route.path) {
    case '':
      return <Index />
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
    case 'spheres-1':
      return <Spheres1 />
    case 'spheres-2':
      return <Spheres2 />
    default:
      return <NotFound route={route} />
  }
}
