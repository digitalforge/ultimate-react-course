import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

function Home() {
  const username = useSelector((state) => state.user.username)

  return (
    <div className="my-10 text-center sm:my-16">
      {username && (
        <h1 className="mb-10 text-4xl font-bold">Welcome back {username}!</h1>
      )}
      <h1 className="mb-4 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          See our menu
        </Button>
      )}
    </div>
  )
}

export default Home
