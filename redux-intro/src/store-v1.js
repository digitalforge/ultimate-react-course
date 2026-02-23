import { useReducer } from 'react'
import { combineReducers, createStore } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

function accountReducer(state = initialStateAccount, { type, payload }) {
  //useReducer hook for reference - just a memory use case I guess
  // const [state, dispatch] = useReducer(reducer, initialState)
  switch (type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + payload }
    case 'account/withdraw':
      return { ...state, balance: state.balance - payload }
    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        balance: state.balance + payload.amount,
        loan: payload.amount,
        loanPurpose: payload.purpose,
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      }

    default:
      return state
  }
}

function customerReducer(state = initialStateCustomer, { type, payload }) {
  switch (type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: payload.fullName,
        nationalID: payload.nationalID,
        createdAt: payload.createdAt,
      }
    case 'customer/updateName':
      return {
        ...state,
        fullName: payload.fullName,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer)

//account actions

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}
function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  }
}
function payLoan() {
  return {
    type: 'account/payLoan',
  }
}

// customer actions

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  }
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName }
}

store.dispatch(createCustomer('Jon Doucette', '2412123423'))
store.dispatch(deposit(250))
console.log(store.getState())
