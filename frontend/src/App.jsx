//import { useState } from "react"
//import QuizStart from "./components/QuizStart"
//import Quiz from "./pages/Quiz"
//import Results from "./pages/Results"

//function App() {
  //const [started, setStarted] = useState(false)
  //const [finished, setFinished] = useState(false)

  //if (!started)
    //return <QuizStart onFinish={() => setStarted(true)} />

  //if (finished)
    //return <Results />

  //return <Quiz onFinish={() => setFinished(true)} />
//}

//export default App
import { useState } from "react"
import QuizStart from "./components/QuizStart"
import Quiz from "./pages/Quiz"
import Results from "./pages/Results"

function App() {
  const [stage, setStage] = useState("start")

  if (stage === "start") {
    return <QuizStart onFinish={() => setStage("quiz")} />
  }

  if (stage === "quiz") {
    return <Quiz onFinish={() => setStage("result")} />
  }

  if (stage === "result") {
    return <Results />
  }

  return null
}

export default App
