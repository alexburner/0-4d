import { FC } from 'react'
import { DownloadTable } from './components/DownloadTable'
import { tableItems } from './data'

export const App: FC = () => (
  <div className="container">
    <DownloadTable items={tableItems} />
  </div>
)
