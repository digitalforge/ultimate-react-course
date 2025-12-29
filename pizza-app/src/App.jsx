import { useEffect } from 'react'
import { pizzaData } from './data'

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu pizzaData={pizzaData} />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className='header'>
      <h1>Fast React Pizza Co.</h1>
    </header>
  )
}

function Menu({ pizzaData }) {
  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {pizzaData.length ? (
        <ul className='pizzas'>
          <Pizza pizzaData={pizzaData} />
        </ul>
      ) : (
        <p>We're still Working on our menu. Please come back later</p>
      )}
    </main>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 1 % 12 || 12
  const closeHour = 18 % 12
  const isOpen = hour >= openHour && hour <= closeHour

  const isOpenMessage = (
    <p>We're open until {closeHour}:00pm. Come visit us our order online</p>
  )

  const isClosedMessage = (
    <p>
      Sorry we're closed. Please come visit us between {openHour}:00am and{' '}
      {closeHour}:00pm
    </p>
  )

  return (
    <footer className='footer'>
      <div className='order'>
        {isOpen ? isOpenMessage : isClosedMessage}
        {isOpen && <button className='btn'>Order Here</button>}
      </div>
    </footer>
  )
}

function Pizza({ pizzaData }) {
  return (
    <>
      {pizzaData &&
        pizzaData.map(pizza => {
          return (
            <li
              className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}
              key={pizza.name}
            >
              <img src={pizza.photoName} alt='' />
              <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
              </div>
            </li>
          )
        })}
    </>
  )
}

export default App
