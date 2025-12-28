export default function Results() {
  const result = JSON.parse(localStorage.getItem("result"))

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No result found</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Result</h2>

        <p className="text-4xl font-bold text-green-600">
          {result.percentage}%
        </p>

        <p className="mt-2 text-gray-600">
          Score: {result.score} / {result.total}
        </p>
      </div>
    </div>
  )
}
