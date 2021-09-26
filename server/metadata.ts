import { DI } from './app'
import { Poll } from './entities/Poll'
import { getAverageColor } from './lib'
import { Choice } from './entities/Choice'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { registerFont, createCanvas, loadImage } from 'canvas'

registerFont(path.join(__dirname, '..', '..', 'common', 'NotoSans-Bold.ttf'), { family: 'Noto' })

interface Metadata {
  title: string,
  url: string,
  image: string,
  description: string
}

const insertMetadata = (indexPage: string, metadata: Metadata): string => {
  return indexPage
    .replace(/{title}/g, metadata.title)
    .replace(/{url}/g, metadata.url)
    .replace(/{image}/g, metadata.image)
    .replace(/{description}/g, metadata.description)
}

const fetchPollInfo = async (id: string): Promise<Poll | null> => {
  const em = DI.orm.em.fork()
  const poll = await em.getRepository(Poll).findOne(id, ['choices'])

  return poll
}

const generatePollCard = async (poll: Poll) => {
  const width = 1200
  const height = 627

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = getAverageColor(poll.choices.getItems().map((choice: Choice) => choice.color))
  context.fillRect(0, 0, width, height)

  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.fillStyle = '#3574d4'
  context.font = '60px Noto'
  context.fillStyle = '#fff'
  context.fillText(poll.title, 600, 160, 1000)

  const logo = await loadImage(path.join(__dirname, '..', '..', 'common', 'logo.png'))

  context.font = '90px Noto'
  context.drawImage(logo, 220, 350)
  context.fillText('Chromapoll', 700, 450)

  const buffer = canvas.toBuffer('image/jpeg')
  const writeFile = util.promisify(fs.writeFile)

  try {
    await writeFile(path.join(__dirname, '..', 'frontend', 'cards', `./${poll.id}.jpg`), buffer)
  } catch(e) {
    // eslint-disable-next-line no-console
    console.log(`Error on saving thumbnail file: ${e}\nReverting to default thumbnail.`)
    return 'opengraph_image.jpg'
  }
  
  return `/cards/${poll.id}.jpg`
}

export const getMetadata = async (path: string, indexPage: string): Promise<string> => {
  // Chromapoll has few enough paths that a simple if-else block is enough.
  // If there are more paths in the future, this should probably be refactored.
  if (path === '/create' || path === '/create/') {
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Create a Poll',
      url: 'https://chromapoll.xyz/create',
      image: '/opengraph_image.jpg',
      description: 'Make polls with color.'
    })
  } else if (path === '/latest' || path === '/latest/') {
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Latest Polls',
      url: 'https://chromapoll.xyz/latest',
      image: '/opengraph_image.jpg',
      description: 'Make polls with color.'
    })
  } else if (path.slice(0, 6) === '/poll/') {
    // Sometimes there's an extra / in the URL
    // Let's strip it before we pass the ID to the DB
    let pollID = path.slice(6)

    if (path.split('').reverse()[0] === '/') {
      pollID = path.slice(6, path.length - 1)
    }

    const poll = await fetchPollInfo(pollID)

    return insertMetadata(indexPage, {
      title: poll ? poll.title : 'Poll not found',
      url: `https://chromapoll.xyz/${pollID}`,
      image: poll ? await generatePollCard(poll) : '/opengraph_image.jpg',
      description: 'Place your vote and watch the colors change.'
    })
  } else {
    return insertMetadata(indexPage, {
      title: 'Chromapoll',
      url: 'https://chromapoll.xyz',
      image: '/opengraph_image.jpg',
      description: 'Make polls with color.'
    })
  }
}