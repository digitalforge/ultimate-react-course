import styles from './Sidebar.module.css'
import Footer from '../Footer/Footer.jsx'
import Logo from '../Logo/Logo'
import AppNav from '../AppNav/AppNav.jsx'
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
