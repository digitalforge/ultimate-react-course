import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUrlPosition } from '../../hooks/useUrlPosition'

import ButtonBack from '../Button/ButtonBack'
import Message from '../Message/Message'
import Button from '../Button/Button'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './Form.module.css'
import { useCities } from '../../context/CitiesContext'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {
  const [lat, lng] = useUrlPosition()

  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [geoCodeError, setgeoCodeError] = useState(null)
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState('')

  const { addCity, isLoading: addCityLoading } = useCities()

  const navigate = useNavigate()

  useEffect(() => {
    if (!lat || !lng) return

    async function fetchCityData() {
      try {
        setgeoCodeError(null)
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) {
          throw new Error(
            `That doesn't seem to be a city. Please click somewhere else`,
          )
        }

        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (err) {
        setgeoCodeError(err.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }

    fetchCityData()
  }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    }

    await addCity(newCity)
    navigate('/app/cities')
  }

  if (geoCodeError) return <Message message={geoCodeError} />

  if (!lat || !lng) return <Message message='Start by clicking on the map' />

  return (
    <form className={`${styles.form} ${addCityLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        {/* <input id='date' onChange={e => setDate(e.target.value)} value={date} /> */}
        <DatePicker
          onChange={date => setDate(date)}
          selected={date}
          dateFormat='MM/dd/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} type='primary'>
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  )
}

export default Form
