import { FC } from 'react'
import { HashRoute } from '../util/hashRoute'

export const NotFound: FC<{ route: HashRoute }> = ({ route }) => (
  <div>
    <h1>Not Found</h1>
    <pre>{JSON.stringify(route, null, 2)}</pre>
  </div>
)
