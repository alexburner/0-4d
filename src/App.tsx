import { FC } from 'react'
import { useHash } from 'react-use'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { Orbits } from './routes/Orbits/Orbits'
import { SpinningBox } from './routes/SpinningBox'
import { parseHashRoute } from './util/hashRoute'

export const App: FC = () => {
  const [hash] = useHash()
  const route = parseHashRoute(hash)
  switch (route.path) {
    case '':
      return <Home />
    case 'spinningBox':
      return <SpinningBox />
    case 'orbits':
      return <Orbits route={route} />
    default:
      return <NotFound route={route} />
  }
}
