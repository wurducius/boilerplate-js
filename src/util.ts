import ConfigRuntime from "../config-runtime"

export const cx = (...styles: Array<string | false | undefined | null>) => styles.filter(Boolean).join(" ")

export const registerSw = () => {
  const { SERVICE_WORKER_ENABLED, SERVICE_WORKER_PATH, VERBOSE_RUNTIME } = ConfigRuntime
  if (SERVICE_WORKER_ENABLED && "serviceWorker" in navigator) {
    return navigator.serviceWorker
      .register(SERVICE_WORKER_PATH)
      .then((reg) => {
        if (VERBOSE_RUNTIME) {
          console.log(`Registration succeeded. Scope is ${reg.scope}`)
        }
        if (reg.installing) {
          if (VERBOSE_RUNTIME) {
            console.log("Service worker installing")
          }
        } else if (reg.waiting) {
          if (VERBOSE_RUNTIME) {
            console.log("Service worker installed")
          }
        } else if (reg.active) {
          if (VERBOSE_RUNTIME) {
            console.log("Service worker active")
          }
        }
      })
      .catch((error) => {
        if (VERBOSE_RUNTIME) {
          console.log(`Registration failed with ${error}`)
        }
      })
  } else {
    return new Promise(() => undefined)
  }
}
