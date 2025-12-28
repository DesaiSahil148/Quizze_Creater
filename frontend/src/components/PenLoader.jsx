import { motion } from "framer-motion"

export default function PenLoader({ text }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  )
}
