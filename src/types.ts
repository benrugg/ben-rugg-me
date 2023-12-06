export type Vector3Array = [x: number, y: number, z: number]

export type Content = {
  title: string
  body: string
  slides?: Slide[]
}

export type Slide = {
  title: string
  description: string
  video?: string
  image?: string
}
