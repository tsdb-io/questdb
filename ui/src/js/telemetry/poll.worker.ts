const ctx: Worker = self as any

ctx.addEventListener("message", () => {
  postMessage("haha")
})
