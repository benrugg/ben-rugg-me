import { MetadataRoute } from "next"
import { rootUrl } from "@/app/config/root-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "",
    },
    sitemap: `${rootUrl}/sitemap.xml`,
  }
}
