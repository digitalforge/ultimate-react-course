import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import SpinnerFullPage from './components/Spinner/SpinnerFullPage'

const Homepage = lazy(() => import('./pages/Homepage/Homepage'))
const Product = lazy(() => import('./pages/Product/Product'))
const Pricing = lazy(() => import('./pages/Product/Pricing'))
const Login = lazy(() => import('./pages/Login/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout'))

const CityList = lazy(() => import('./components/City/CityList'))
const City = lazy(() => import('./components/City/City'))
const CountryList = lazy(() => import('./components/Country/CountryList'))
const Form = lazy(() => import('./components/Form/Form'))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
