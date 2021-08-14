const errorMessages = {
  NotFound: (name: string): string => `${name} not found`,
  MissingTitle: 'A title is required.',
  MissingChoices: 'Polls must have at least 2 choices.',
  TooManyChoices: 'Polls are limited to a maxiumum of 8 choices.',
  MissingLabel: 'At least one choice is missing a label',
  MissingColor: 'At least one choices is missing a color'
}

export default errorMessages