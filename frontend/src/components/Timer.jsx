import { useEffect, useState } from "react"
import { BACKEND_URL } from "../api"

export default function Timer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      fetch(`${BACKEND_URL}/time-left`)
        .then(res => res.json())
        .then(d => setTime(d.remaining))
    }, 1000)

    return () => clearInterval(i)
  }, [])

  return (
    <div className="mb-4 font-semibold">
      Time Left: {time}s
    </div>
  )
}
