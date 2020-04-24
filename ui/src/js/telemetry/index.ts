import PollWorker from "./poll.worker.ts"

const start = async () => {
  const response = await fetch("/telemetry")

  const startTelemetryWorker = () => {
    console.log("start web worker")
    const worker: Worker = new PollWorker()

    worker.onmessage = (event) => {
      console.log("received: " + event.data)
    }
    worker.postMessage(42)
  }

  setInterval(startTelemetryWorker, 5e3)
}

export default start
