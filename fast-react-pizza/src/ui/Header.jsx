import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'

function Header() {
  return (
    <header>
      <Link to='/'>Fact React Pizza Co.</Link>
      <SearchOrder />
      <p>Jon</p>
    </header>
  )
}

export default Header
