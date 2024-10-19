import { FC } from 'react'
import { Page } from '../components/Page'

interface Link {
  text: string
  hash: string
}

const links: Link[] = [
  {
    text: 'Trail Rows — Orbiting',
    hash: '#trails?behavior=orbiting',
  },
  {
    text: 'Trail Rows — Wandering',
    hash: '#trails?behavior=wandering',
  },
  {
    text: 'Trail Columns — Interior Orbits',
    hash: '#trail-columns?behavior=orbiting&bounding=centerScaling',
  },
  {
    text: 'Trail Columns — Exterior Orbits',
    hash: '#trail-columns?behavior=orbiting&bounding=edgeBinding',
  },
  {
    text: 'Trails Combined',
    hash: '#trails-combined?behavior=orbiting&particles=9',
  },
  {
    text: 'Trails Surface — orbiting',
    hash: '#trails-surface?behavior=orbiting&particles=9',
  },
  {
    text: 'Trails Surface — wandering',
    hash: '#trails-surface?behavior=wandering&particles=9',
  },
  {
    text: 'Trails Surface — reflecting',
    hash: '#trails-surface?behavior=rays&particles=9',
  },
  {
    text: 'Stacks — Diffusion',
    hash: '#stacks?behavior=diffusion',
  },
  // {
  //   text: 'Torus Test',
  //   hash: '#torus-test',
  // },
]

export const linksByHash = links.reduce<Record<string, Link>>((acc, link) => {
  acc[link.hash] = link
  return acc
}, {})

export const Index: FC = () => (
  <Page>
    <h1>ndim</h1>
    {links.map((link) => (
      <p key={link.text}>
        <a href={link.hash}>{link.text}</a>
      </p>
    ))}
  </Page>
)
