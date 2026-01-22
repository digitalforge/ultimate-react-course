import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const initialState = {
  questions: [],
  //possible status: 'loading','error','ready','active','finished'
  status: 'loading',
  currentQuestion: 0,
  answer: null,
  points: 0,
}

function reducer(state, dispatchAction) {
  switch (dispatchAction.type) {
    case 'dataRecieved':
      return { ...state, questions: dispatchAction.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: dispatchAction.payload,
        points:
          dispatchAction.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    default:
      throw new Error('Action Unknown')
  }
}

function App() {
  const [{ status, questions, currentQuestion, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const questionsCount = questions.length
  console.log(questionsCount)

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
          <StartScreen questionsCount={questionsCount} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Question
            question={questions[currentQuestion]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  )
}

export default App
