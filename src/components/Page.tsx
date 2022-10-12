import { FC } from 'react'

export const Page: FC<{
  children: React.ReactNode
}> = ({ children }) => <div className="page">{children}</div>
