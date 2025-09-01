import { FC } from 'react'
import { useHash } from 'react-use'
import { D0123 } from './routes/D0123'
import { Index, linksByHash } from './routes/Index'
import { NotFound } from './routes/NotFound'
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
    case 'd0123':
      return <D0123 />
    default:
      return <NotFound route={route} />
  }
}
