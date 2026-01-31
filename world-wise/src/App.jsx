import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Product from './pages/Product/Product'
import Homepage from './pages/Homepage/Homepage'
import Pricing from './pages/Product/Pricing'
import Login from './pages/Login/Login'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import AppLayout from './pages/AppLayout/AppLayout'
import CityList from './components/City/CityList'
import City from './components/City/City'
import CountryList from './components/Country/CountryList'
import Form from './components/Form/Form'

const BASE_URL = 'http://localhost:8000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route
              path='cities'
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path='cities/:id' element={<City />} />
            <Route
              path='countries'
              element={<CountryList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path='form' element={<Form />}></Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
