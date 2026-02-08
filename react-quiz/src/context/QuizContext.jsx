import { createContext, useContext, useEffect } from 'react'
import { useReducer } from 'react'

const QuizContext = createContext()

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

function QuizProvider({ children }) {
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
    <QuizContext
      value={{
        status,
        questions,
        currentQuestion,
        answer,
        points,
        highScore,
        secondsRemaining,
        difficulty,
        totalPoints,
        questionsCount: questions.length,
        dispatch,
      }}
    >
      {children}
    </QuizContext>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('QuizContext was used outside the QuizProvider')

  return context
}

export { useQuiz, QuizProvider }
