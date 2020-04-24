import { fetchApi } from "../utils"
import PollWorker from "./poll.worker.ts"

type TelemetryResponse = Readonly<{ active: boolean; interval: number }>

const geta = async () => {
  // const response = await fetchApi<TelemetryResponse>("/telemetry")
  const response = { data: { active: true, interval: 1e4 } }

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

export default geta
