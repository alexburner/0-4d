import { FC } from 'react'
import { Page } from '../components/Page'

const links = [
  {
    text: 'Trails — Orbiting',
    href: '#trails?behavior=orbiting',
  },
  {
    text: 'Trails — Wandering',
    href: '#trails?behavior=wandering',
  },
  {
    text: 'Trail Columns — Interior Orbits',
    href: '#trail-columns?behavior=orbiting&bounding=centerScaling',
  },
  {
    text: 'Trail Columns — Exterior Orbits',
    href: '#trail-columns?behavior=orbiting&bounding=edgeBinding',
  },
  {
    text: 'Stacks — Diffusion',
    href: '#stacks?behavior=diffusion',
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
