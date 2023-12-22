import { MetadataRoute } from "next"
import { rootUrl } from "@/config/root-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${rootUrl}/sitemap.xml`,
  }
}
