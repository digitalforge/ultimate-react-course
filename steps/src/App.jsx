import { useEffect } from 'react'
import { useState } from 'react'

const messages = [
  'Learn React 💻',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

function App() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  //useEffect(() => {}, [step])

  function handlePrevious() {
    step <= 1 ? setStep(3) : setStep(currStep => currStep - 1)
  }

  function handleNext() {
    step < 3 ? setStep(currStep => currStep + 1) : setStep(1)
  }

  return (
    <>
      <button className='close' onClick={() => setIsOpen(is => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>
          <div className='buttons'>
            <button
              onClick={() => handlePrevious()}
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
            >
              Previous
            </button>
            <button
              onClick={() => handleNext()}
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
