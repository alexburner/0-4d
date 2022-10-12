import { FC } from 'react'
import { Page } from '../components/Page'
import { HashRoute } from '../util/hashRoute'

export const Orbits: FC<{ route: HashRoute }> = ({ route }) => {
  console.log(route)
  return (
    <Page>
      <h1>Orbits</h1>
    </Page>
  )
}
