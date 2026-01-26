import styles from './Sidebar.module.css'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import AppNav from '../components/AppNav.jsx'
import { Outlet } from 'react-router-dom'

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default SideBar
