function StartScreen({ questionsCount, dispatch, difficulty }) {
  return (
    <div className='start'>
      <h2>Welcome to the Quiz!</h2>
      <h3>{questionsCount} questions to test your React mastery</h3>
      <h4>{difficulty ? `Difficulty: ${difficulty}` : 'Choose Difficulty'}</h4>
      <div className='btn-group'>
        <button
          onClick={() => dispatch({ type: 'setDifficulty', payload: 'easy' })}
          className='btn btn-ui easy-btn'
          disabled={difficulty && difficulty !== 'easy'}
        >
          Easy
        </button>
        <button
          onClick={() => dispatch({ type: 'setDifficulty', payload: 'medium' })}
          className='btn btn-ui medium-btn'
          disabled={difficulty && difficulty !== 'medium'}
        >
          Medium
        </button>
        <button
          onClick={() => dispatch({ type: 'setDifficulty', payload: 'hard' })}
          className='btn btn-ui hard-btn'
          disabled={difficulty && difficulty !== 'hard'}
        >
          Hard
        </button>
        <button
          onClick={() => dispatch({ type: 'setDifficulty', payload: 'all' })}
          className='btn btn-ui very-hard-btn'
          disabled={difficulty && difficulty !== 'all'}
        >
          All of 'em
        </button>
      </div>
      <br />
      <br />
      {difficulty && (
        <button
          className='btn btn-ui'
          onClick={() => dispatch({ type: 'start' })}
        >
          Let's Start
        </button>
      )}
    </div>
  )
}

export default StartScreen
