const envBoolean = (name: string, defaultValue: boolean) => {
  if (defaultValue) {
    return process.env[name] !== "false"
  } else {
    return process.env[name] === "true"
  }
}

const envString = (name: string, defaultValue: string) => process.env[name] ?? defaultValue

const envNumber = (name: string, defaultValue: number) => (process.env[name] ? Number(process.env[name]) : defaultValue)

const ConfigRuntime: ConfigRuntimeType = {
  SERVICE_WORKER_ENABLED: true,
  SERVICE_WORKER_PATH: "./service-worker.js",
  VERBOSE_RUNTIME: true
}

export type ConfigRuntimeType = {
  SERVICE_WORKER_ENABLED: boolean,
  SERVICE_WORKER_PATH: string,
  VERBOSE_RUNTIME: boolean
}

export default ConfigRuntime
