import { useNavigationStore } from "@/app/stores/navigationStore"
import { useScreenState } from "@/app/hooks/useScreenState"
import { TempImage, TempImageHtml } from "@/app/components/TempImage"

export function CompaniesScreen() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState("companies")

  // TEMP: create sections
  const tempColors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff", "#99ffff"]

  // TODO: determine if it's ok/best to mount/unmount or if we should just hide/show

  return (
    <group visible={isVisible}>
      {isVisible &&
        tempColors.map((tempColor, index) => (
          <TempImage
            key={index}
            tempColor={tempColor}
            index={index}
            sectionIndex={sectionIndex}
            isTransitioningTo={isTransitioningTo}
            isTransitioningFrom={isTransitioningFrom}
            isScreenReady={isScreenReady}
          />
        ))}
    </group>
  )
}

export function CompaniesScreenHtml() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState("companies")

  // TEMP: create sections
  const tempContents = [
    {
      title: "section 1",
      body: "From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.",
    },
    {
      title: "section 2",
      body: `A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am
        alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so
        absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.`,
    },
    {
      title: "section 3",
      body: `From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.<br /><br />
        Learn everything there is to know about the ubiquitous lorem ipsum passage.<br /><br />
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am
        alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so
        absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.<br /><br />
          I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When,
        while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees,
        and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie
        close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow
        familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own
        image, and the breath.`,
    },
    {
      title: "section 4",
      body: "From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.",
    },
    {
      title: "section 5",
      body: `A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am
        alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so
        absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.`,
    },
    {
      title: "section 6",
      body: `From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.<br />
        Learn everything there is to know about the ubiquitous lorem ipsum passage.<br /><br />
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am
        alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so
        absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.<br /><br />
          I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When,
        while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees,
        and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie
        close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow
        familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own
        image, and the breath.`,
    },
  ]

  return (
    <>
      {isVisible &&
        tempContents.map((tempContent, index) => (
          <TempImageHtml
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            isTransitioningTo={isTransitioningTo}
            isTransitioningFrom={isTransitioningFrom}
            isScreenReady={isScreenReady}
            title={tempContent.title}
            body={tempContent.body}
          />
        ))}
    </>
  )
}
