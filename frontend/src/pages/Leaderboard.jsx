import { useEffect, useState } from "react"
import { BACKEND_URL } from "../api"

export default function Leaderboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${BACKEND_URL}/leaderboard`)
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      {data.map((u, i) => (
        <p key={i}>{u.username} — {u.score}</p>
      ))}
    </div>
  )
}
