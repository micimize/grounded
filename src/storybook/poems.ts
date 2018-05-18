import { stripIndents } from 'common-tags'

type Poem = {
  title: string,
  published: string,
  author: string,
  _author: { name: string, born: string, died: string },
  content: string,
  translator?: string
}

const poems: [Poem, Poem] = [
  {
    title: 'Whoever has much to proclaim one day ...',
    published: '1883',
    translator: 'The Nietzsche Channel © 2010',
    author: 'Friedrich Nietzsche',
    _author: {
      name: 'Friedrich Nietzsche',
      born: '1844-10-15',
      died: '1900-08-25'
    },
    content: stripIndents`
      Whoever has much to proclaim one day, 
      Keeps much to himself in silence: 
      whoever has to kindle one day light, 
      be a cloud. 
    `,
  },
  {
    title: 'It sifts from Leaden Sieves',
    published: '1891',
    author: 'Emily Dickinson',
    _author: {
      name: 'Emily Dickinson',
      born: '1830-12-10',
      died: '1886-05-15'
    },
    content: stripIndents`
      It sifts from Leaden Sieves -
      It powders all the Wood.
      It fills with Alabaster Wool
      The Wrinkles of the Road -

      It makes an Even Face
      Of Mountain, and of Plain -
      Unbroken Forehead from the East
      Unto the East again -

      It reaches to the Fence -
      It wraps it Rail by Rail
      Till it is lost in Fleeces -
      It deals Celestial Vail

      To Stump, and Stack - and Stem -
      A Summer’s empty Room -
      Acres of Joints, where Harvests were,
      Recordless, but for them -

      It Ruffles Wrists of Posts
      As Ankles of a Queen -
      Then stills its Artisans - like Ghosts -
      Denying they have been -
  `,
  }
]

export default poems