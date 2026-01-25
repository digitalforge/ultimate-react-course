import AppNav from '../components/AppNav'
import SideBar from '../components/SideBar'
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className>
      <AppNav />
      <SideBar />
    </div>
  )
}

export default AppLayout
