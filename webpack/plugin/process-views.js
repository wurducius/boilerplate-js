import path from "path"
import fs from "node:fs"
import { addAsset, CWD } from "./plugin-util.cjs"
import { htmlTemplate } from "../compile/html-template.js"
import { headData } from "../compile/head.js"

const stylesPath = path.join(CWD, "resources", "styles")

const stylePaths = [
  path.join(stylesPath, "theme.css"),
  path.join(stylesPath, "base.css"),
  path.join(stylesPath, "simple.css"),
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
          return htmlTemplate({ ...headData, styles, content })
        })
      ).toString()
      addAsset(compilation, assetName, nextSource, { optimized: false })
    }),
  )
}
