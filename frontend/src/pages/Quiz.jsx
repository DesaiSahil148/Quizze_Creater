import { useEffect, useState } from "react"
import { BACKEND_URL } from "../api"
import Timer from "../components/Timer"
import PenLoader from "../components/PenLoader"

export default function Quiz({ onFinish }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    export const BACKEND_URL = "https://quizze-creater-backend.onrender.com"


      .then(res => res.json())
      .then(data => {
        console.log("Fetched questions:", data)
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [])

  const handleSelect = (qid, option) => {
    setAnswers(prev => ({ ...prev, [qid]: option }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`${BACKEND_URL}/submit-answers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quiz_id: 2,
        answers
      })
    })

    const data = await res.json()
    localStorage.setItem("result", JSON.stringify(data))
    onFinish()
  }

  if (loading) return <PenLoader text="Loading Questions..." />

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quiz Assessment</h1>
          <Timer />
        </div>

        {/* 🔴 DEBUG SECTION (IMPORTANT) */}
        <p className="text-red-600 font-semibold mb-2">
          Questions count: {questions.length}
        </p>

        <pre className="text-xs bg-gray-200 p-3 rounded mb-6 overflow-auto">
          {JSON.stringify(questions, null, 2)}
        </pre>
        {/* 🔴 DEBUG SECTION END */}

        {questions.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow mb-6">
            <p className="font-medium mb-4">
              {index + 1}. {q.question}
            </p>

            {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => {
              const letter = ["a", "b", "c", "d"][i]
              return (
                <label
                  key={letter}
                  className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer mb-2
                  ${
                    answers[q.id] === letter
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === letter}
                    onChange={() => handleSelect(q.id, letter)}
                  />
                  {opt}
                </label>
              )
            })}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium"
        >
          Submit Quiz
        </button>

      </div>
    </div>
  )
}
