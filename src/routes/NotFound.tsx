import { FC } from 'react'
import { Page } from '../components/Page'
import { HashRoute } from '../util/hashRoute'

export const NotFound: FC<{ route: HashRoute }> = ({ route }) => (
  <Page>
    <h1>Not Found</h1>
    <pre>{JSON.stringify(route, null, 2)}</pre>
  </Page>
)
