export interface Poll {
  title: string,
  choices: Choice[],
  id: string
}

export interface Choice {
  label: string,
  color: string,
  votes: number,
  id: string
}

export interface ChoiceWithData extends Choice {
  percent: number,
  offset: number
}

export interface RGBColor {
  r: number,
  g: number,
  b: number
}