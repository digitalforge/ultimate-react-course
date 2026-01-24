function Progress({ index, questionCount, points, totalPoints, answer }) {
  return (
    <header className='progress'>
      <progress
        value={index + Number(answer !== null)}
        max={questionCount}
      ></progress>
      <p>
        Question <strong>{index} </strong>/ {questionCount}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
      <p className='highscore'></p>
    </header>
  )
}

export default Progress
