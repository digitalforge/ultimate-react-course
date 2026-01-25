import styles from './Sidebar.module.css'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import AppNav from '../components/AppNav.jsx'

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Footer />
    </div>
  )
}

export default SideBar
