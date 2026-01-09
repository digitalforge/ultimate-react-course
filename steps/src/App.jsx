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
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className='buttons'>
            <Button bgColor='#7950f2' textColor='#fff' onClick={handlePrevious}>
              <span>👈 Previous</span>
            </Button>
            <Button bgColor='#7950f2' textColor='#fff' onClick={handleNext}>
              <span>Next 👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </button>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  )
}

export default App
