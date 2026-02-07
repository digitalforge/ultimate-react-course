import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/FakeAuthContext'
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
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route
              path='app'
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />}></Route>
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />}></Route>
              <Route path='form' element={<Form />}></Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
