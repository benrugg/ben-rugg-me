import type { Content } from "@/types"

export const projectInfo: Content[] = [
  {
    text: [
      {
        title: "/Project",
        body: "Prism / 2023",
      },
      {
        title: "/Description",
        body: "Prism is an open source generative AI art wall I created for my home. It uses a Raspberry Pi, a 4K projector and Stable Diffusion AI to create an ever-changing art piece. It's also voice controlled!",
      },
      {
        title: "/Code",
        body: "github.com/benrugg/prism-palette",
        url: "https://github.com/benrugg/prism-palette",
      },
      {
        title: "/Tech Stack",
        body: `
          <ul>
            <li>Vue.js</li>
            <li>Firebase</li>
            <li>Pico Voice</li>
            <li>Raspberry Pi</li>
            <li>Stable Diffusion AI</li>
          </ul>
        `,
      },
    ],
    slides: [
      {
        image: "/images/content/projects/prism-0.jpg",
      },
      {
        image: "/images/content/projects/prism-1.jpg",
      },
      {
        image: "/images/content/projects/prism-2.jpg",
      },
      {
        image: "/images/content/projects/prism-3.jpg",
      },
      {
        video: "/video/prism.mp4",
      },
      {
        image: "/images/content/projects/prism-4.jpg",
      },
      {
        image: "/images/content/projects/prism-5.jpg",
      },
      {
        image: "/images/content/projects/prism-6.jpg",
      },
    ],
  },
]
