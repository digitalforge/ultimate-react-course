import { useQuiz } from '../context/QuizContext'
import Options from './Options'
function Question() {
  const { questions, currentQuestion, dispatch, answer } = useQuiz()

  const question = questions[currentQuestion]
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question
