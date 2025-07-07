import "dotenv/config"

const envBoolean = (name, defaultValue) => {
  if (defaultValue) {
    return process.env[name] !== "false"
  } else {
    return process.env[name] === "true"
  }
}

const envString = (name, defaultValue) => process.env[name] ?? defaultValue

const envNumber = (name, defaultValue) => (process.env[name] ? Number(process.env[name]) : defaultValue)

const ConfigCompile = {
  PUBLIC_DIRNAME: envString("PUBLIC_DIRNAME", "public"),
  BUILD_DIRNAME: envString("BUILD_DIRNAME", "dist"),
  PROFILER_COMPILE: envBoolean("PROFILER_COMPILE", true),
  VERBOSE_COMPILE: envBoolean("VERBOSE_COMPILE", true),
  OPEN: envBoolean("OPEN", true),
  PORT: envNumber("PORT", 5173),
  CLEAR_SCREEN: envString("CLEAR_SCREEN", true),
  PROJECT_URL: envString("PROJECT_URL", "https://eofol.com/boilerplate-js"),
  PROJECT_NAME: envString("PROJECT_NAME", "Boilerplate-js"),
}

export default ConfigCompile
