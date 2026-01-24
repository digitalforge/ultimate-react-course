import { NavLink } from 'react-router-dom'
import PageNav from '../components/PageNav'
function Homepage() {
  return (
    <>
      <PageNav />
      <h1>World Wise</h1>
      <NavLink to='/app'>Go to the App</NavLink>
    </>
  )
}

export default Homepage
