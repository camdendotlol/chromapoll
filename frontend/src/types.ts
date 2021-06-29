export interface Poll {
  title: string,
  choices: {
    text: string,
    color: string
  },
  id: string
}

export interface PollOption {
  label: string,
  votes: number,
  color: string,
  percent?: number,
  offset?: number
}