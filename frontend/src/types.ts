export interface Poll {
  title: string,
  choices: {
    text: string,
    color: string
  }
}

export interface PollOption {
  label: string,
  votes: number,
  color: string,
  percent?: number,
  offset?: number
}