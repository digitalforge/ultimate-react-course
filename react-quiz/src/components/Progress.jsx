import { useQuiz } from '../context/QuizContext'
function Progress() {
  const { index, questionsCount, points, totalPoints, answer } = useQuiz()
  return (
    <header className='progress'>
      <progress
        value={index + Number(answer !== null)}
        max={questionsCount}
      ></progress>
      <p>
        Question <strong>{index} </strong>/ {questionsCount}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
      <p className='highscore'></p>
    </header>
  )
}

export default Progress
