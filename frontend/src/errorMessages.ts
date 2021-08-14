const errorMessages = {
  NotFound: (name: string): string => `${name} not found`,
  MissingTitle: 'A title is required.',
  MissingChoices: 'Polls must have at least 2 choices.',
  TooManyChoices: 'Polls are limited to a maxiumum of 8 choices.',
  MissingLabel: 'At least one choice is missing a label',
  MissingColor: 'At least one choices is missing a color',
  BadHexCode: 'At least one choice has an invalid color hex code.',
  TooLong: (name: string, number: number): string => `${name} are limited to ${number} characters.`
}

export default errorMessages