function FinishScreen({
  points,
  totalPoints,
  dispatch,
  highScore,
  secondsRemaining,
}) {
  const percentage = (points / totalPoints) * 100

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  const message =
    percentage === 100
      ? 'Perfect score! Congratulations!'
      : percentage >= 80
        ? 'Great job! You did really well.'
        : percentage >= 50
          ? 'Good effort! But there is room for improvement.'
          : 'Keep trying! Practice makes perfect.'
  return (
    <>
      <p className='result'>
        <span className='message'>{message}</span>
        You scored <strong>{points}</strong> out of {totalPoints} points (
        {Math.ceil(percentage)}%).
      </p>
      <p className='highscore'>Your highest score is: {highScore} points.</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
