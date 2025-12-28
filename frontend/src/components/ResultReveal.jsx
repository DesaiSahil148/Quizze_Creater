import { motion } from "framer-motion"

export default function ResultReveal({ score = 8, percent = 80, rank = 5 }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-10 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Quiz Result
        </h2>

        <p className="text-5xl font-bold text-green-600 mb-2">
          {percent}%
        </p>

        <p className="text-gray-600 mb-4">
          Score: {score}
        </p>

        <p className="text-sm text-gray-500">
          Rank #{rank}
        </p>
      </motion.div>
    </div>
  )
}
