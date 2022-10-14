import { FC } from 'react'
import { Page } from '../components/Page'

const links = [
  {
    text: 'Trails — Orbits [ center-scaling ]',
    href: '#trails?behavior=orbits&bounding=centerScaling',
  },
  {
    text: 'Trails — Orbits [ edge-binding ]',
    href: '#trails?behavior=orbits&bounding=edgeBinding',
  },
  {
    text: 'Trails — Wandering [ center-scaling ]',
    href: '#trails?behavior=wandering&bounding=centerScaling',
  },
  {
    text: 'Trails — Wandering [ edge-binding ]',
    href: '#trails?behavior=wandering&bounding=edgeBinding',
  },
]

export const Home: FC = () => (
  <Page>
    <h1>0-4d</h1>
    {links.map((link) => (
      <p key={link.text}>
        <a href={link.href}>{link.text}</a>
      </p>
    ))}
  </Page>
)
