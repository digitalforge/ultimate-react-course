import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import Timer from './components/Timer'
import Footer from './components/Footer'

const SECONDS_PER_QUESTION = 30

const initialState = {
  allQuestions: [],
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  difficulty: null,
}

function reducer(state, dispatchAction) {
  switch (dispatchAction.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: dispatchAction.payload,
        status: 'ready',
        allQuestions: dispatchAction.payload,
      }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'setDifficulty':
      const easyQuestions = state.questions.filter(q => q.points === 10)
      const mediumQuestion = state.questions.filter(
        q => q.points < 30 && q.points > 10,
      )
      const hardQuestions = state.questions.filter(q => q.points === 30)
      console.log(easyQuestions)
      return {
        ...state,
        difficulty: dispatchAction.payload,
        status: 'ready',
        questions:
          dispatchAction.payload === 'easy'
            ? easyQuestions
            : dispatchAction.payload === 'medium'
              ? mediumQuestion
              : dispatchAction.payload === 'hard'
                ? hardQuestions
                : state.questions,
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      }
    case 'newAnswer':
      const question = state.questions.at(state.currentQuestion)
      return {
        ...state,
        answer: dispatchAction.payload,
        points:
          dispatchAction.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: state.allQuestions,
        status: 'ready',
        highScore: state.highScore,
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        highScore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highScore)
            : state.highScore,
      }
    default:
      throw new Error('Action Unknown')
  }
}

function App() {
  const [
    {
      status,
      questions,
      currentQuestion,
      answer,
      points,
      highScore,
      secondsRemaining,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  const questionsCount = questions.length
  const totalPoints = questions.reduce((curr, previous) => {
    return curr + previous.points
  }, 0)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions')
        const data = await res.json()
        dispatch({ type: 'dataRecieved', payload: data })
      } catch (err) {
        dispatch({ type: 'dataFailed' })
      }
    }

    fetchQuestions()
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            questionsCount={questionsCount}
            dispatch={dispatch}
            difficulty={difficulty}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={currentQuestion}
              questionCount={questionsCount}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestion={currentQuestion}
                questionCount={questionsCount}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highScore={highScore}
            secondsRemaining={secondsRemaining}
          />
        )}
      </Main>
    </div>
  )
}

export default App
