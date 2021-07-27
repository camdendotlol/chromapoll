import { Collection, LoadedCollection } from "@mikro-orm/core"
import { Choice } from "../entities/Choice"
import { IP } from "../entities/Ip"
import { Poll } from "../entities/Poll"

export const getColors = (length: number) => {
  switch (length) {
    case 2:
      return ['#ff0000', '#0000ff']
    case 3:
      return ['#ff0000', '#008000', '#0000ff']
    case 4:
      return ['#00ffff', '#ff00ff', '#ffff00', '#000000']
    default:
      throw new Error('Invalid number of choices - only 2, 3, or 4 is currently supported.')
  }
}

type PollWithVoters = (Poll & {
  choices: LoadedCollection<Choice, Choice>;
  voters?: Collection<IP, unknown>;
})

export const removeVoters = (poll: PollWithVoters) => {
  const clone = { ...poll, voters: undefined }
  return clone
}