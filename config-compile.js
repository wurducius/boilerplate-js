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
  PUBLIC_DIRNAME: "public",
  BUILD_DIRNAME: "dist",
  PROFILER_COMPILE: true,
  VERBOSE_COMPILE: true,
  OPEN: true,
  PORT: 5173,
  CLEAR_SCREEN: true,
}

export default ConfigCompile
