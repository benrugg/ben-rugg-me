import { useEffect, useState } from "react"
import { useScreenState } from "@/app/hooks/useScreenState"
import CloseButton from "@/app/components/CloseButton"
import { firaCode } from "@/fonts/fonts"
import { resumeSentences } from "@/app/data/resume-sentences"
import styles from "./glitch.module.scss"

const maxSentences = 16
const sentenceInterval = 640

function FullStackEngineerScreenHtmlContents() {
  // init state
  const [displayedSentences, setDisplayedSentences] = useState<string[]>([])

  // use an interval to display the sentences one by one
  useEffect(() => {
    // choose a random sentence to start with
    let nextSentenceIndex = Math.floor(Math.random() * resumeSentences.length)

    // clear initial displayed sentences
    setDisplayedSentences([])

    // start interval, adding a new sentence every time
    const interval = setInterval(() => {
      setDisplayedSentences((prev) => {
        // add the next sentence
        const nextDisplayedSentences = [...prev, resumeSentences[nextSentenceIndex]]

        // after max sentences, remove the first one
        if (nextDisplayedSentences.length > maxSentences) {
          nextDisplayedSentences.shift()
        }

        // choose the next sentence index
        nextSentenceIndex = (nextSentenceIndex + 1) % resumeSentences.length

        // return the new array
        return nextDisplayedSentences
      })
    }, sentenceInterval)

    // stop the interval when the screen is no longer active
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {displayedSentences.map((sentence, index) => (
        <div
          className={`lg:max-w-[1200px] sm:max-w-2xl mx-auto sm:text-sm text-[11px] uppercase tracking-wider text-center ${styles.glitch}`}
          key={index}
        >
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
          <p className={styles.line}>{sentence}</p>
        </div>
      ))}
    </>
  )
}

export function FullStackEngineerScreenHtml() {
  // get the current screen state
  const { isActive, isTransitioningTo, isScreenReady } = useScreenState("full-stack-engineer")

  // prepare animation classes
  const cssClass = isTransitioningTo || isScreenReady ? "fade-in" : "fade-out"
  const closeButtonCssClass = isTransitioningTo || isScreenReady ? "fade-in-slow-with-delay" : "fade-out"

  return (
    <>
      {isActive && (
        <>
          <div
            className={`flex flex-col justify-center h-[100dvh] w-screen absolute px-2 bg-black text-white bg-opacity-80 ${cssClass} ${firaCode.className}`}
          >
            <FullStackEngineerScreenHtmlContents />
          </div>
          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 scale-150 ${closeButtonCssClass}`}>
            <CloseButton />
          </div>
        </>
      )}
    </>
  )
}
