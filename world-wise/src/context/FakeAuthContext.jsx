import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function authReducer(state, { type, payload }) {
  switch (type) {
    case 'login':
      return { ...state, user: payload, isAuthenticated: true }
    case 'logout':
      return { ...state, user: null, isAuthenticated: false }
    default:
      throw new Error('Error unknown')
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState,
  )

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER })
  }

  function logout() {
    dispatch({ type: 'logout' })
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === 'undefined')
    throw new Error('Authcontext was used outside the AuthProvider')
  return context
}

export { useAuth, AuthProvider }
