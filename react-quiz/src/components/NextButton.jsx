function NextButton({ dispatch, answer, currentQuestion, questionCount }) {
  if (answer === null) return null

  if (currentQuestion === questionCount - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    )
  }

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  )
}

export default NextButton
