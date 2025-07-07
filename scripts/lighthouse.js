import open from "open"
import { logEofolScript } from "./impl/util.js"
import ConfigCompile from "../config-compile.js"

const { PROJECT_URL } = ConfigCompile

const projectUrl = encodeURIComponent(PROJECT_URL)

logEofolScript("lighthouse")

await open(`https://pagespeed.web.dev/analysis?url=${projectUrl}`)
