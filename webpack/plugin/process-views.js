import path from "path"
import fs from "node:fs"
import { addAsset, CWD } from "./plugin-util.cjs"
import HeadData from "../../head.json" with { type: "json" }

const htmlTemplate = ({
  title,
  description,
  icon,
  manifest,
  themeColor,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
  ogImageAlt,
  appleTouchIcon,
  styles,
  script,
  content,
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${icon}" />
    <link rel="manifest" href="${manifest}" />
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${ogTitle ?? title}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:image" content="${ogImage ?? icon}" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
    <link rel="apple-touch-icon" href="${appleTouchIcon ?? icon}" />
    <meta name="theme-color" content="${themeColor}" />
    <title>${title}</title><style>${styles}</style>
  </head>
  <body>
    ${content}
    <script src="${script}"></script>
  </body>
</html>`

const stylePaths = [
  path.join(CWD, "resources", "styles", "theme.css"),
  path.join(CWD, "resources", "styles", "base.css"),
  path.join(CWD, "resources", "styles", "simple.css"),
]

const templatesPath = path.join(CWD, "templates")
const projectPath = path.join(CWD, "src")

const getViewPath = (view) => path.join(templatesPath, `${view}.html`)
const getStylesheetPath = (view) => path.join(projectPath, `${view}.css`)

export const processViews = async (compiler, compilation) => {
  const views = (await fs.promises.readdir(templatesPath, { recursive: true }))
    .filter((filename) => filename.endsWith(".html"))
    .map((filename) => filename.substring(0, filename.lastIndexOf(".")) || filename)
  await Promise.all(
    views.map(async (view) => {
      const assetName = `${view}.html`
      const nextSource = (
        await fs.promises.readFile(getViewPath(view)).then((buffer) => {
          const content = buffer.toString()
          const customStylesheetPath = getStylesheetPath(view)
          const styles = (fs.existsSync(customStylesheetPath) ? [...stylePaths, customStylesheetPath] : stylePaths)
            .map((stylePath) => fs.readFileSync(stylePath).toString())
            .join(" ")
          return htmlTemplate({ ...HeadData, styles, content })
        })
      ).toString()

      addAsset(compilation, assetName, nextSource, { optimized: false })
    }),
  )
}
