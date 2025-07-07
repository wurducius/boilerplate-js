const envBoolean = (name: string, defaultValue: boolean) => {
  if (defaultValue) {
    return process.env[name] !== "false"
  } else {
    return process.env[name] === "true"
  }
}

const envString = (name: string, defaultValue: string) => process.env[name] ?? defaultValue

// eslint-disable-next-line no-unused-vars
const envNumber = (name: string, defaultValue: number) => (process.env[name] ? Number(process.env[name]) : defaultValue)

const ConfigRuntime: ConfigRuntimeType = {
  SERVICE_WORKER_ENABLED: envBoolean("SERVICE_WORKER_ENABLED", true),
  SERVICE_WORKER_PATH: envString("SERVICE_WORKER_PATH", "./service-worker.js"),
  VERBOSE_RUNTIME: envBoolean("VERBOSE_RUNTIME", true),
}

export type ConfigRuntimeType = {
  SERVICE_WORKER_ENABLED: boolean
  SERVICE_WORKER_PATH: string
  VERBOSE_RUNTIME: boolean
}

export default ConfigRuntime
