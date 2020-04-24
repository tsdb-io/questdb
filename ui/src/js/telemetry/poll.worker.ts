import { fetchApi } from "../../utils"

const ctx: Worker = self as any

const start = async () => {
  // const response = await fetchApi<TelemetryResponse>("/telemetry")
  const response = { data: { active: true, interval: 1e4 } }
  ctx.addEventListener("message", () => {
    postMessage("haha")
  })

  if (!response.error && response.data.active) {
    const startTelemetryWorker = () => {
      const worker: Worker = new PollWorker()

      worker.onmessage = (event) => {
        console.log("received: " + event.data)
      }
      worker.postMessage(42)
    }

    setInterval(startTelemetryWorker, response.data.interval)
  }
}

export default start
