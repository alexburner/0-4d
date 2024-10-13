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
    text: 'Trails Combined',
    href: '#trails-combined?behavior=orbiting&particles=9',
  },
  {
    text: 'Trails Surface',
    href: '#trails-surface?behavior=orbiting&particles=9',
  },
  {
    text: 'Stacks — Diffusion',
    href: '#stacks?behavior=diffusion',
  },
  {
    text: 'Torus Test',
    href: '#torus-test',
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
