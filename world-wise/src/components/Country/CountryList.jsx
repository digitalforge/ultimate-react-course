import styles from './CountryList.module.css'
import Spinner from '../../components/Spinner/Spinner'
import CountryItem from '../../components/Country/CountryItem'

function CountryList({ cities = [], isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length) return 'No Countries'

  // const countries = cities.reduce((arr, city) => {
  //   const exists = arr.some(el => el.country === city.country)
  //   if (!exists) arr.push({ country: city.country, emoji: city.emoji })
  //   return arr
  // }, [])

  const countries = cities.reduce((arr, city) => {
    const exists = arr.some(el => el.country === city.country)
    if (!exists) arr.push({ country: city.country, emoji: city.emoji })
    return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList
