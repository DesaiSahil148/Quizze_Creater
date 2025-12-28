import { motion } from "framer-motion"

export default function QuizStart({ onFinish }) {
  setTimeout(onFinish, 2500)

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white"
      >
        <h1 className="text-4xl font-bold mb-2">
          Best Of Luck 🍀
        </h1>
        <p className="text-lg opacity-90">
          Do Your Best
        </p>
      </motion.div>
    </div>
  )
}
