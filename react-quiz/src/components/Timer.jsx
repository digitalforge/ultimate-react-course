import { useEffect, useState } from 'react'
import { useQuiz } from '../context/QuizContext'

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz()
  const [timeRemaining, setTimeRemaining] = useState(secondsRemaining)
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  useEffect(() => {
    let timerId = setInterval(() => {
      setTimeRemaining(time => time - 1)
    }, 1000)

    //cleanup function
    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    if (timeRemaining === 0) {
      dispatch({ type: 'finish' })
    }
  }, [timeRemaining, dispatch])
  return (
    <div className='timer'>
      {minutes > 9 ? minutes : `0${minutes}`}:
      {seconds > 9 ? seconds : `0${seconds}`}
    </div>
  )
}

export default Timer
