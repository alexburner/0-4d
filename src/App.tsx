import { Canvas } from '@react-three/fiber'
import { FC } from 'react'
import { useHash } from 'react-use'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { SpinningBox } from './routes/SpinningBox'
import { parseHashRoute } from './util/hashRoute'

export const App: FC = () => {
  const [hash] = useHash()
  const route = parseHashRoute(hash)
  switch (route.path) {
    case '':
      return <Home />
    case 'spinningBox':
      return (
        <Canvas>
          <SpinningBox />
        </Canvas>
      )
    default:
      return <NotFound route={route} />
  }
}
