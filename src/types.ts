export type Vector3Array = [x: number, y: number, z: number]

export type Content = {
  text: ContentText[]
  slides: ContentSlide[]
}

type ContentText = {
  title: string
  body: string
  url?: string
}

type ContentSlide = ImageSlide | VideoSlide

export type ImageSlide = {
  image: string
}

export type VideoSlide = {
  video: string
}
