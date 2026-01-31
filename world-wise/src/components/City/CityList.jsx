import styles from './CityList.module.css'
import Spinner from '../../components/Spinner/Spinner'
import CityItem from './CityItem'
import Message from '../../components/Message/Message'

function CityList({ cities = [], isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking a city on the map' />
    )
  return (
    <ul className={styles.cityList}>
      {cities && cities.map(city => <CityItem city={city} key={city.id} />)}
    </ul>
  )
}

export default CityList
