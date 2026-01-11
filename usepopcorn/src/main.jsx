import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
// import './index.css'
// import App from './App.jsx'

import StarRating from './components/StarRating'

function Test() {
  const [movieRating, setMovieRating] = useState(0)

  return (
    <div>
      <StarRating
        starColor='blue'
        starOutlineColor='blue'
        maxRating={10}
        textColor='blue'
        onSetRating={setMovieRating}
      />
      <p>The rating if this movie is {movieRating} </p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
      defaultRating={3}
    />
    <StarRating
      maxRating={10}
      starSize={25}
      textSize={16}
      starOutlineColor='#e2ad00ff'
    />
    <Test />
  </StrictMode>
)
