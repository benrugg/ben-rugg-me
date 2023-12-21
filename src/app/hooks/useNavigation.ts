// From @brandonscript
// https://github.com/vercel/next.js/discussions/42016#discussioncomment-4847318

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { usePrevious } from "./usePrevious"

interface NavigationEvents {
  routeChanged?: ({ pathname, searchParams }: { pathname: string | null; searchParams: URLSearchParams | null }) => void
}

export const useNavigation = ({ on }: { on?: NavigationEvents }) => {
  const pathname = usePathname()
  const prevPathname = usePrevious(pathname)

  const searchParams = useSearchParams()
  const prevSearchParams = usePrevious(searchParams)

  const { routeChanged } = on || {}
  const [route, setRoute] = useState({ pathname, searchParams })

  useEffect(() => {
    if (searchParams?.toString() !== prevSearchParams?.toString() || pathname !== prevPathname) {
      setRoute({ pathname, searchParams })
      routeChanged?.({ pathname, searchParams })
    }
  }, [pathname, prevPathname, prevSearchParams, routeChanged, searchParams])

  return { route }
}
