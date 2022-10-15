import { FC } from 'react'
import { useHash } from 'react-use'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { Stacks } from './routes/Stacks'
import { Trails } from './routes/Trails'
import { parseHashRoute } from './util/hashRoute'

export const App: FC = () => {
  const [hash] = useHash()
  const route = parseHashRoute(hash)
  switch (route.path) {
    case '':
      return <Home />
    case 'trails':
      return <Trails route={route} />
    case 'stacks':
      return <Stacks route={route} />
    default:
      return <NotFound route={route} />
  }
}
