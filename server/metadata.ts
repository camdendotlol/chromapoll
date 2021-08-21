import { DI } from './app'
import { Poll } from './entities/Poll'

interface Metadata {
  title: string,
  url: string
}

const insertMetadata = (indexPage: string, metadata: Metadata): string => {
  return indexPage
    .replace(/{title}/g, metadata.title)
    .replace(/{url}/g, metadata.url)
}

const fetchPollTitle = async (id: string): Promise<string> => {
  const em = DI.orm.em.fork()
  const poll = await em.getRepository(Poll).findOne(id)

  if (!poll) {
    return 'Poll not found'
  }

  return poll.title
}

export const getMetadata = async (path: string, indexPage: string): Promise<string> => {
  // Chromapoll has few enough paths that a simple if-else block is enough.
  // If there are more paths in the future, this should probably be refactored.
  if (path === '/create' || path === '/create/') {
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Create a Poll',
      url: 'https://chromapoll.xyz/create'
    })
  } else if (path === '/latest' || path === '/latest/') {
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Latest Polls',
      url: 'https://chromapoll.xyz/latest'
    })
  } else if (path.slice(0, 6) === '/poll/') {
    // Sometimes there's an extra / in the URL
    // Let's strip it before we pass the ID to the DB
    let pollID = path.slice(6)
    if (path.split('').reverse()[0] === '/') {
      pollID = path.slice(6, path.length - 1)
    }

    return insertMetadata(indexPage, {
      title: await fetchPollTitle(pollID),
      url: `https://chromapoll.xyz${pollID}`
    })
  } else {
    return insertMetadata(indexPage, {
      title: 'Chromapoll',
      url: 'https://chromapoll.xyz'
    })
  }
}