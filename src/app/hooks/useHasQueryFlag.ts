import { useSearchParams } from "next/navigation"

const negativeValues = ["false", "0", "no", "off"]

export const useHasQueryFlag = (flag: string) => {
  const searchParams = useSearchParams()
  const flagValue = searchParams.get(flag)
  return flagValue !== null && !negativeValues.includes(flagValue.toLowerCase())
}
