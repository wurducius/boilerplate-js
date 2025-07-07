import "dotenv/config"

const envString = (name) => process.env[name]

export const headData = {
  title: envString("title"),
  description: envString("description"),
  icon: envString("icon"),
  manifest: envString("manifest"),
  themeColor: `#${envString("themeColor")}`,
  ogTitle: envString("ogTitle"),
  ogType: envString("ogType"),
  ogUrl: envString("ogUrl"),
  ogImage: envString("ogImage"),
  ogImageAlt: envString("ogImageAlt"),
  appleTouchIcon: envString("appleTouchIcon"),
  script: envString("script"),
}
